import {BotTS} from "../BotTS";
import {BaseModuleCommand} from "./BaseModuleCommand";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = [];
const allowedGuilds = [];

export class Test extends BaseModuleCommand {
    service: any;

    constructor(bot: BotTS) {
        super(bot, "test");
        //this.service = require('../core/service/UserService.ts')
    }

    async runCommand(level: Number, user: string): Promise<any> {
        //TODO
        // 1. get userservice or commandservice
        // 2. check if module exist and update or insert value in UserModule table
    }

    /*async run(message, args) {
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

        //let r = await this.service.ListUser(this.bot.sql);
        //message.channel.send(r);

        //r = await this.service.TestUser(this.bot.sql);
        //message.channel.send(r);
    }*/
}

module.exports = Test;