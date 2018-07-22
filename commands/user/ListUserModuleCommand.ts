import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {CommandError} from "../../exceptions/CommandError";
import {GetUserModule} from "../../core/service/UserService";
import {BaseUserCommand} from "./BaseUserCommand";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880", "413390615158718466"];

export class ListUserModuleCommand extends BaseUserCommand {

    protected constructor(bot: Bot) {
        super(bot, "listusermodule", ['lum']);
    }

    assertSyntax(message: Message, args: string[]) {
        // Check command as correct number of arguments
        if (args.length > 2) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async runCommand(message: Message, args: string[]) {
        let [usersId, params] = this.cleanArgs(message, args);

        let id = (usersId.length > 0) ? usersId[0] : message.author.id;
        let moduleTypeFilter = params.length > 0 ? params[0] : null;
        let tab = await GetUserModule(this.bot.sql, id, moduleTypeFilter);
        message.reply(tab).then((msg: Message) => msg.delete(this.config.timeout * 4));
    }

    // Display usage of command
    getHelpMsg(): string {
        return "__Usage 1__:\n\n\t`!" + this.config.name + "[typeModule]` \t\t *Liste ses propre modules référencés. Possibilité de rajouter le type de module parmis TS|FS|SS|A|B*" +
            "\n\n__Usage 2__:\n\n\t`!" + this.config.name + " @mention [typeModule]` \t\t *Liste les modules de la personne. Possibilité de rajouter le type de module parmis TS|FS|SS|A|B*" +
            "\n\n__Exemple__:\n\t```!" + this.config.name + " @Aurel BS```";
    }
}

module.exports = ListUserModuleCommand;