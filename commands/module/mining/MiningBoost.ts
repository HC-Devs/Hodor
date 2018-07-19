import {Bot} from "../../../Bot";
import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message, Snowflake} from "discord.js";

export class MiningBoost extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "miningboost");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO 
    }
}

module.exports = MiningBoost;