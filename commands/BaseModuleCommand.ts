import * as logger from "../utils/Logger.js";
import {BaseCommand} from "./BaseCommand";
import {BotTS} from "../BotTS";
import {Message} from "discord.js";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];
const allowedGuilds = [];

export abstract class BaseModuleCommand extends BaseCommand {

    protected constructor(bot: BotTS, commandName: string, prefix = ['!'], timeout = 5000, maxLevel = 10) {
        let config = {
            name: commandName,
            prefix: prefix,
            timeout: timeout,
            maxLevel: maxLevel
        };
        super(bot, config);
    }

    async run(message: Message, args: string[]) {
        // check command permissions
        if (!this.isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            return;
        }

        // check arguments count
        if (args.length !== 1) return;

        // check command level
        const level = args[0] && !isNaN(parseInt(args[0])) ? parseInt(args[0]) : -1;
        if (level < 1 || level > this.config.maxLevel) {   //Could we use 0 as value to delete module if use make an error ?
            let helpMsg = this.getHelpMsg();
            message.channel.send(":x: KO\n" + helpMsg).then((msg: Message) => {
                msg.delete(this.config.timeout).catch(reason => {
                    logger.error(reason);
                });
            });
            return;
        }

        let memberId = message.mentions.users.first() ? message.mentions.users.first().id : message.author.id;

        this.runCommand(message, level, memberId).then(() => {
            message.channel.send(":white_check_mark: OK").then((msg: Message) => {
                msg.delete(this.config.timeout).catch(reason => {
                    logger.error(reason);
                });
            });
        }).catch(reason => {
            logger.error(reason);
        });
    }

    // Virtual method that could be overrided
    // Display usage of command
    getHelpMsg(): string {
        return "Usage:\n\t```!" + this.config.name + " level````" +
            "Exemple:\n\t```!" + this.config.name + " 5````";
    }

    // Execute current module update command
    async abstract runCommand(message: Message, level: number, user: string);
}