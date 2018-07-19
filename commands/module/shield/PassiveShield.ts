import {BaseModuleCommand} from "../BaseModuleCommand";
import {Bot} from "../../../Bot";
import {Message, Snowflake} from "discord.js";

export class PassiveShield extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "passiveshield");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO
    }
}

module.exports = PassiveShield;