import {Bot} from "../../../Bot";
import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message, Snowflake} from "discord.js";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];
const allowedGuilds = [];

export class HydrogenBayExtension extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "hydrogenbayextension", ["h2ext"]);
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO
    }
}

module.exports = HydrogenBayExtension;