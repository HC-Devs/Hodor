import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {CommandError} from "../../exceptions/CommandError";
import {DeleteUser} from "../../core/service/UserService";
import {BaseUserCommand} from "./BaseUserCommand";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880", "413390615158718466"];
const allowedGuilds = [];

export class DeleteUserCommand extends BaseUserCommand {

    protected constructor(bot: Bot) {
        super(bot, "deleteuser", ['du']);
    }

    assertSyntax(message: Message, args: string[]) {
        // Check command as correct number of arguments
        if (args.length > 1) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async runCommand(message: Message, args: string[]) {

        let [usersId, argsCleaned] = this.cleanArgs(message, args);
        let memberId = usersId.length > 0 ? usersId.pop() : message.author.id;

        let tab = await DeleteUser(this.bot.sql, memberId);
        message.reply("Suppression ok").then((msg: Message) => msg.delete(this.config.timeout));
    }

    // Display usage of command
    getHelpMsg(): string {
        return "Usage:\n\t```!" + this.config.name + " [Corpo]````" +
            "Exemple:\n\t```!" + this.config.name + " HadesCorpo````";
    }
}

module.exports = DeleteUserCommand;