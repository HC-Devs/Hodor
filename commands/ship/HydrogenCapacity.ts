import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {BaseShipCommand} from "./BaseShipCommand";

export class HydrogenCapacity extends BaseShipCommand {

    constructor(bot: Bot) {
        super(bot, "hydrogencapacity", ['hydro']);
    }

    assertSyntax(message: Message, args: string[]) {
        // TODO
    }

    async runCommand(message: Message, args: string[]) {
        //TODO 
    }
}

module.exports = HydrogenCapacity;