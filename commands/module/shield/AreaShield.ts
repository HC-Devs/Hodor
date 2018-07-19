import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message, Snowflake} from "discord.js";
import {Bot} from "../../../Bot";

export class AreaShield extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "areashield");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO
    }
}

module.exports = AreaShield;