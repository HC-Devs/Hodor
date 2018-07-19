import {BaseModuleCommand} from "../BaseModuleCommand";
import {Bot} from "../../../Bot";
import {Message, Snowflake} from "discord.js";

export class DeltaShield extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "deltashield", ["ds"]);
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO
    }
}

module.exports = DeltaShield;