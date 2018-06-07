import {BaseModuleCommand} from "../BaseModuleCommand";
import {BotTS} from "../../BotTS";
import {Message, Snowflake} from "discord.js";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];
const allowedGuilds = [];

export class Zone extends BaseModuleCommand {

    constructor(bot: BotTS) {
        super(bot, "zone");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO
    }
}

module.exports = Zone;