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

        if(message.mentions.members.size > 0){
            // Si on a mentionné qq'un: on extrait son nom et sa guild
            const user= message.mentions.members.first();
            await DeleteUser(this.bot.sql, user.id);
        }else{
            // Sinon on prend les param de la commande
            await DeleteUser(this.bot.sql, args[0]);
        }
    }

    // Display usage of command
    getHelpMsg(): string {
        return "__Usage 1__:\n\n\t`!" + this.config.name + "Id`\t\t *Supprimer un joueur exterieur à la corpo*" +
        "\n\n__Usage 2__:\n\n\t`!" + this.config.name + " @mention`\t\t *Supprimer un joueur de HC*" +
     "\n\n__Exemple__:\n\t```!" + this.config.name + " DarkHadesCorpo_DarkAurel ```";
    }
}

module.exports = DeleteUserCommand;