import {BaseModuleCommand} from "../module/BaseModuleCommand";
import {Message, Snowflake} from "discord.js";
import {Bot} from "../../Bot";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];

export class CargoCapacity extends BaseModuleCommand {

    constructor(bot: Bot) {
        super(bot, "cargocapacity");
    }

    async runCommand(message: Message, level: number, user: Snowflake) {
        //TODO 
    }
}

module.exports = CargoCapacity;