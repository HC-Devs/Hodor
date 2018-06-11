import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {CommandError} from "../../exceptions/CommandError";
import {ListUser} from "../../core/service/UserService";
import {BaseUserCommand} from "./BaseUserCommand";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880", "413390615158718466"];
const allowedGuilds = [];

export class ListUserCommand extends BaseUserCommand {

    protected constructor(bot: Bot) {
        super(bot, "listuser", ['lu']);
    }

    assertSyntax(message: Message, args: string[]) {
        // Check command as correct number of arguments
        if (args.length > 1) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async runCommand(message: Message, args: string[]) {

        let corpoName = args.length > 0 ? args.pop() : null;

        let tab = await ListUser(this.bot.sql, corpoName);
        message.reply(tab).then((msg: Message) => msg.delete(this.config.timeout));
    }

    // Display usage of command
    getHelpMsg(): string {
        return "Usage:\n\t```!" + this.config.name + " [Corpo]````" +
            "Exemple:\n\t```!" + this.config.name + " HadesCorpo````";
    }
}

module.exports = ListUserCommand;