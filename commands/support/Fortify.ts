import {Bot} from "../../Bot";
import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message, Snowflake} from "discord.js";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];
const allowedGuilds = [];

export class Fortify extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "fortify");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO 
    }
}

module.exports = Fortify;