import {Bot} from "../../../Bot";
import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message, Snowflake} from "discord.js";

export class DualLaser extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "duallaser");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO 
    }
}

module.exports = DualLaser;