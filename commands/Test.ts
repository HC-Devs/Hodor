import {BotTS} from "../BotTS";
import {BaseModuleCommand} from "./BaseModuleCommand";
import {Message, Snowflake} from "discord.js";
import * as service from "../core/service/UserService";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = [];
const allowedGuilds = [];

export class Test extends BaseModuleCommand {

    constructor(bot: BotTS) {
        super(bot, "test");
    }

    async runCommand(message: Message, level: number, user: Snowflake): Promise<any> {
        //TODO
        // 1. get userservice or commandservice
        // 2. check if module exist and update or insert value in UserModule table
        let r = await service.ListUser(this.bot.sql);
        message.channel.send(r);

        r = await service.TestUser(this.bot.sql);
        message.channel.send(r);
    }
}

module.exports = Test;