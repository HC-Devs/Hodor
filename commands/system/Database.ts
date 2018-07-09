import {Global} from "../../utils/Global";
import {BaseCommand} from "../BaseCommand";
import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {Config} from "../Config";

const allowedUsers = Global.botOwner;
const allowedRoles = [];
const allowedChannels = [];
const allowedGuilds = [];

export class Database extends BaseCommand {

    constructor(bot: Bot) {
        let config = new Config("database", ["db"]);
        super(bot, config);
    }

    assertIsGranted(message: Message) {

    }

    assertSyntax(message: Message, args: string[]) {

    }

    async run(message: Message, args: any) {

    }
}