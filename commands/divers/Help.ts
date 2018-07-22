import {BaseCommand} from "../BaseCommand";
import {Message} from "discord.js";
import {Config} from "../Config";

/* Class */
export class Help extends BaseCommand {

    constructor(bot) {
        let config = new Config("help", ["h"], ['!'], 10000);
        super(bot, config);
    }

    assertIsGranted(message: Message) {
        //all ok
    }

    assertSyntax(message: Message, args: string[]) {
        //all ok
    }

    async run(message: Message, args: string[]): Promise<any> {
        //TODO
    }
}

module.exports = Help;