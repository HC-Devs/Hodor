import {BaseCommand} from "../BaseCommand";
import {Message, Snowflake} from "discord.js";
import {Bot} from "../../Bot";
import {Logger} from "../../utils/Logger";
import {Config} from "../Config";
import {UnauthorizedAccessError} from "../../exceptions/UnauthorizedAccessError";
import {CommandError} from "../../exceptions/CommandError";
import {AddModuleToUser, GetUserModule} from "../../core/service/UserService";
import {Global} from "../../utils/Global";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880", "413390615158718466"];

export abstract class BaseModuleCommand extends BaseCommand {

    protected constructor(bot: Bot, commandName: string, aliases = [], prefix = ["!"], timeout = 5000, maxLevel = 10) {
        let config = new Config(commandName, aliases, prefix, timeout, maxLevel);
        super(bot, config);
    }

    assertIsGranted(message: Message) {
        if (!this.isGranted(message, Global.allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            throw new UnauthorizedAccessError();
        }
    }

    assertSyntax(message: Message, args: string[]) {
        // If there is more than 1 mention and more than 2 arguments (mention included)
        if (message.mentions.users.array().length > 1 || args.length > 2) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async run(message: Message, args: string[]) {
        let [ids, p] = this.cleanArgs(message, args);
        let memberId: Snowflake = ids.length > 0 ? ids[0] : message.author.id;

        if (p.length == 0) {
            GetUserModule(this.bot.sql, memberId, "Bouclier").then(value => {
                Logger.log(value);
            }).catch(reason => {
                Logger.error(reason);
            });
        }

        // check command level
        const level = p[0] && !isNaN(parseInt(p[0])) ? parseInt(p[0]) : -1;
        if (level < 1 || level > this.config.maxLevel) {   //Could we use 0 as value to delete module if use make an error ?
            let helpMsg = this.getHelpMsg();
            message.channel.send(":x: KO\n" + helpMsg).then((msg: Message) => {
                msg.delete(this.config.timeout).catch(reason => {
                    Logger.error(reason);
                });
            });
            return;
        }

        AddModuleToUser(this.bot.sql, memberId, this.config.name, level).then(success => {
            if (success) {
                message.channel.send(":white_check_mark: OK").then((msg: Message) => {
                    msg.delete(this.config.timeout).catch(reason => {
                        Logger.error(reason);
                    });
                });
            } else {
                Logger.error("Erreur");
            }
        });
    }

    // Virtual method that could be overrided
    // Display usage of command
    getHelpMsg(): string {
        return "Usage:\n\t```!" + this.config.name + " level````" +
            "Exemple:\n\t```!" + this.config.name + " 5````";
    }

    // Execute current module update command
    async abstract runCommand(message: Message, level: number, user: Snowflake);
}