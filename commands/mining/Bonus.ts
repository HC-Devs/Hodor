import {BotTS} from "../../BotTS";
import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message} from "discord.js";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];
const allowedGuilds = [];

export class Bonus extends BaseModuleCommand {

    constructor(bot: BotTS) {
        super(bot, "bonus");
    }

    async runCommand(message: Message, level: Number, user: string) {
        //TODO 
    }
}

module.exports = Bonus;