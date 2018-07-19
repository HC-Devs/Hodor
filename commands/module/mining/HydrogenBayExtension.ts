import {Bot} from "../../../Bot";
import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message, Snowflake} from "discord.js";

export class HydrogenBayExtension extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "hydrogenbayextension", ["h2ext"]);
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO
    }
}

module.exports = HydrogenBayExtension;