import {Global} from "../../utils/Global";
import {BaseCommand} from "../BaseCommand";
import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {Config} from "../Config";
import {UnauthorizedAccessError} from "../../exceptions/UnauthorizedAccessError";
import {CommandError} from "../../exceptions/CommandError";

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
        if (!this.isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            throw new UnauthorizedAccessError();
        }
    }

    assertSyntax(message: Message, args: string[]) {
        if (args.length !== 1) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async run(message: Message, args: string[]) {
        switch (args[0]) {
            case "init":
                break;
            case "drop":
                break;
            default:
                await message.reply(this.getHelpMsg());
                break;
        }
    }

    private init() {
        // TODO initialize database from sql file
    }

    private drop() {
        // TODO drop current database
    }

    getHelpMsg(): string {
        return "show database manipulation help";
    }
}

module.exports = Database;