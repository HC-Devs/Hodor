import {Global} from "../../utils/Global";
import {BaseCommand} from "../BaseCommand";
import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {Config} from "../Config";
import {UnauthorizedAccessError} from "../../exceptions/UnauthorizedAccessError";
import {CommandError} from "../../exceptions/CommandError";
import {Logger} from "../../utils/Logger";

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
                await this.init(message);
                break;
            case "drop":
                await this.drop(message);
                break;
            default:
                await message.reply(this.getHelpMsg());
                break;
        }
    }

    private async init(message: Message) {
        this.bot.sql.init().then(() => {
            // TODO
        }).catch(reason => {
            Logger.error(reason);
        });
    }

    private async drop(message: Message) {
        this.bot.sql.drop().then(() => {
            // TODO
        }).catch(reason => {
            Logger.error(reason);
        });
    }

    getHelpMsg(): string {
        return "show database manipulation help";
    }
}

module.exports = Database;