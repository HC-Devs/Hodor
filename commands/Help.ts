import {BaseCommand} from "./BaseCommand";
import {Message} from "discord.js";
import {Config} from "./Config";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = [];
const allowedGuilds = [];

/* Class */
export class Help extends BaseCommand {

    constructor(bot) {
        let config = new Config("help", ["h"], ['!'], 10000);
        super(bot, config);
    }

    async run(message: Message, args: any): Promise<any> {
        //TODO
    }
}

module.exports = Help;