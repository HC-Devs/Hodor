import {BotTS} from "../../BotTS";
import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message, Snowflake} from "discord.js";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];
const allowedGuilds = [];

export class Penurie extends BaseModuleCommand {

    constructor(bot: BotTS) {
        super(bot, "penurie");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO 
    }
}

module.exports = Penurie;