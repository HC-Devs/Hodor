import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message, Snowflake} from "discord.js";
import {Bot} from "../../../Bot";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];
const allowedGuilds = [];

export class AreaShield extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "areashield");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO
    }
}

module.exports = AreaShield;