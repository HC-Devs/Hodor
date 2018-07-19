import {BaseModuleCommand} from "../BaseModuleCommand";
import {Bot} from "../../../Bot";
import {Message, Snowflake} from "discord.js";

export class MirrorShield extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "mirrorshield");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO
    }
}

module.exports = MirrorShield;