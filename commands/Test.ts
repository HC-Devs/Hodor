import {Bot} from "../Bot";
import {Message} from "discord.js";
import * as service from "../core/service/UserService";
import {BaseCommand} from "./BaseCommand";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = [];
const allowedGuilds = [];

export class Test extends BaseCommand {

    constructor(bot: Bot) {
        let config = {
            name: "test",
            prefix: ['!'],
            aliases: ["toto", "titi"],
            timeout: 10000
        };
        super(bot, config);
    }

    async run(message: Message, args: any): Promise<any> {
        //TODO
        // 1. get userservice or commandservice
        // 2. check if module exist and update or insert value in UserModule table
        // let r = await service.ListUser(this.bot.sql);
        // message.channel.send(r);

        // r = await service.TestUser(this.bot.sql);
        let r = await service.GetUserModule(this.bot.sql, message.author.id);
        message.channel.send(r);
    }
}

module.exports = Test;