import * as logger from "../../utils/Logger.js";
import {Config} from "../../Config";
import {Bot} from "../../Bot";
import {BaseCommand} from "../BaseCommand";
import {Message} from "discord.js";

const allowedUsers = Config.botOwner;
const allowedRoles = [];
const allowedChannels = [];
const allowedGuilds = [];

export class Purge extends BaseCommand {

    constructor(bot: Bot) {
        let config = {
            name: "purge",
            prefix: ['!'],
            timeout: 5000
        };
        super(bot, config);
    }

    async run(message: Message, args: string[]) {
        // check command permissions
        if (!this.isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            return;
        }

        const limit = (args[0] && !isNaN(parseInt(args[0]))) ? parseInt(args[0]) : -1;
        const options = limit === -1 ? {} : {limit: limit, before: message.id};

        message.channel.fetchMessages(options).then(messages => {
            message.channel.bulkDelete(messages);
        }).catch(reason => {
            message.reply(`Couldn't delete messages because of: ${reason}`).then(() => {
                logger.error(reason);
            });
        }).then(() => {
            message.delete().catch(reason => {
                logger.error(reason);
            });
        });
    }
}

module.exports = Purge;