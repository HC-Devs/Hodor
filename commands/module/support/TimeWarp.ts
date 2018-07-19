import {Bot} from "../../../Bot";
import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message, Snowflake} from "discord.js";

export class TimeWarp extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "timewarp");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO 
    }
}

module.exports = TimeWarp;