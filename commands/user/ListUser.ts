import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {CommandError} from "../../exceptions/CommandError";
import {ListUser} from "../../core/service/UserService";
import {BaseUserCommand} from "./BaseUserCommand";

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
        return "__Usage__:\n\n\t`!" + this.config.name + " [Corpo]` \t\t *Liste les utilisateurs connus. Possibilité d'ajouter le nom de la corpo pour filtrer*" +
            "\n\n__Exemple__:\n\t```!" + this.config.name + " HadesCorpo```";
    }
}

module.exports = ListUserCommand;