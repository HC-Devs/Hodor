import {BaseCommand} from "../BaseCommand";
import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {Logger} from "../../utils/Logger";
import {Config} from "../Config";
import {UnauthorizedAccessError} from "../../exceptions/UnauthorizedAccessError";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880", "413390615158718466"];
const allowedGuilds = [];

export abstract class BaseUserCommand extends BaseCommand {

    protected constructor(bot: Bot, commandName: string, aliases = [], prefix = ['!'], timeout = 5000, maxLevel = 10) {
        let config = new Config(commandName, aliases, prefix, timeout, maxLevel);
        super(bot, config);
    }

    assertIsGranted(message: Message) {
        if (!this.isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            throw new UnauthorizedAccessError();
        }
    }

    async run(message: Message, args: string[]) {
        // check command permissions
        if (!this.isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            return;
        }


        this.runCommand(message, args).then(() => {
            message.channel.send(":white_check_mark: OK").then((msg: Message) => {
                msg.delete(this.config.timeout).catch(reason => {
                    Logger.error(reason);
                });
            });
        }).catch(reason => {
            Logger.error(reason);
        });
    }

    async abstract runCommand(message: Message, args: string[]);
}