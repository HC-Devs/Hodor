import {Bot} from "../../../Bot";
import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message, Snowflake} from "discord.js";

export class CargoBayExtension extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "cargobayextension");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO 
    }
}

module.exports = CargoBayExtension;