import {BaseModuleCommand} from "../BaseModuleCommand";
import {Bot} from "../../../Bot";
import {Message, Snowflake} from "discord.js";

export class OmegaShield extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "omegashield");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO
    }
}

module.exports = OmegaShield;