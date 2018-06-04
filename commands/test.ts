/* Vars */

/* Libs */

/* Rights */
import {BotTS} from "../BotTS";
import {Command} from "./Command";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = [];
const allowedGuilds = [];

/* - */
const command = "test";

/* Class */
export class Test extends Command {
    service: any;

    constructor(bot: BotTS) {
        let config = {
            name: "test",
            prefix: ["!"],
            timeout: 5000
        };
        super(bot, config);

        //this.service = require('../core/service/UserService.ts')
    }

    async run(message, args) {
        // check guilds
        if (allowedGuilds.length > 0 && allowedGuilds.indexOf(message.guild.id) === -1) return;

        // check users
        if (allowedUsers.length > 0 && allowedUsers.indexOf(message.author.id) === -1) return;

        // check roles
        //if (allowedRoles.length > 0 && !message.member.roles.some(r => allowedRoles.includes(r.name))) return;

        // check channels
        if (allowedChannels.length > 0 && allowedChannels.indexOf(message.channel.id) === -1) return;

        // command
        const deleteMessageTime = (30 * 1000);

        message.channel.send(":white_check_mark: OK").then(msg => msg.delete(deleteMessageTime));

        /*
        let r = await this.service.ListUser(this.bot.sql);
        message.channel.send(r);

        r = await this.service.TestUser(this.bot.sql);
        message.channel.send(r);*/
    }
}

module.exports = Test;