import {Bot} from "../../../Bot";
import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message, Snowflake} from "discord.js";

export class RemoteRepair extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "remoterepair");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO 
    }
}

module.exports = RemoteRepair;