import {Bot} from "../../../Bot";
import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message, Snowflake} from "discord.js";

export class MiningUnity extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "miningunity");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO 
    }
}

module.exports = MiningUnity;