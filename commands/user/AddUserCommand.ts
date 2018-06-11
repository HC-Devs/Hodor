import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {CommandError} from "../../exceptions/CommandError";
import {AddOrUpdateUser} from "../../core/service/UserService";
import {BaseUserCommand} from "./BaseUserCommand";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880", "413390615158718466"];
const allowedGuilds = [];

export class AddUserCommand extends BaseUserCommand {

    protected constructor(bot: Bot) {
        super(bot, "adduser", ['au'], ['!'], 25000);
    }

    assertSyntax(message: Message, args: string[]) {
        // Check if we have only 1 valid argument (except user mention)
        let count = message.mentions.members.array().length == 0 ? args.length : (args.length - message.mentions.members.array().length);
        if (count != 1) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async runCommand(message: Message, args: string[]) {

        let [usersId, argsCleaned] = this.cleanArgs(message, args);
        let memberId = usersId.length > 0 ? usersId.pop() : message.author.id;

        await AddOrUpdateUser(this.bot.sql, memberId, argsCleaned[0], argsCleaned[1]);
        message.reply("Maj ok").then((msg: Message) => msg.delete(this.config.timeout));
    }

    // Display usage of command
    getHelpMsg(): string {
        return "Usage:\n\t```!" + this.config.name + " Nom Corpo````" +
            "Exemple:\n\t```!" + this.config.name + " Aurel HadesCorpo````";
    }
}

module.exports = AddUserCommand;