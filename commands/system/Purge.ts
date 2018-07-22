import {Global} from "../../utils/Global";
import {Bot} from "../../Bot";
import {BaseCommand} from "../BaseCommand";
import {Message} from "discord.js";
import {Logger} from "../../utils/Logger";
import {Config} from "../Config";
import {UnauthorizedAccessError} from "../../exceptions/UnauthorizedAccessError";
import {CommandError} from "../../exceptions/CommandError";

const allowedUsers = Global.botOwner;
const allowedRoles = [];
const allowedChannels = [];

export class Purge extends BaseCommand {
    assertIsGranted(message: Message) {
        if (!this.isGranted(message, Global.allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            throw new UnauthorizedAccessError();
        }
    }

    assertSyntax(message: Message, args: string[]) {
        // Check command as correct number of arguments
        if (args.length < 1 && args.length > 1) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    constructor(bot: Bot) {
        let config = new Config("purge");
        super(bot, config);
    }

    async run(message: Message, args: string[]) {
        const limit = (args[0] && !isNaN(parseInt(args[0]))) ? parseInt(args[0]) : -1;
        const options = limit === -1 ? {} : {limit: limit, before: message.id};

        message.channel.fetchMessages(options).then(messages => {
            message.channel.bulkDelete(messages);
        }).catch(reason => {
            message.reply(`Couldn't delete messages because of: ${reason}`).then(() => {
                Logger.error(reason);
            });
        }).then(() => {
            message.delete().catch(reason => {
                Logger.error(reason);
            });
        });
    }
}

module.exports = Purge;