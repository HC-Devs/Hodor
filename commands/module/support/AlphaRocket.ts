import {Bot} from "../../../Bot";
import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message, Snowflake} from "discord.js";

export class AlphaRocket extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "alpharocket");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO 
    }
}

module.exports = AlphaRocket;