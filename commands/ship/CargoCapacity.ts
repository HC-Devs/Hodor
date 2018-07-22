import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {BaseShipCommand} from "./BaseShipCommand";

export class CargoCapacity extends BaseShipCommand {

    constructor(bot: Bot) {
        super(bot, "cargocapacity", ['cargo']);
    }

    assertSyntax(message: Message, args: string[]) {
        // TODO
    }

    async runCommand(message: Message, args: string[]) {
        //TODO 
    }
}

module.exports = CargoCapacity;