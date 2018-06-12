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
        let count = message.mentions.members.size === 0 ? 2: 1;
        if (count != args.length) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async runCommand(message: Message, args: string[]) {

        //let [usersId, argsCleaned] = this.cleanArgs(message, args);

        if(message.mentions.members.size > 0){
            // Si on a mentionné qq'un: on extrait son nom et sa guild
            const user= message.mentions.members.first();
            await AddOrUpdateUser(this.bot.sql, user.id, user.displayName,user.guild.name);
        }else{
            // Sinon on prend les param de la commande
            const uid = args[1] + "_" + args[0];
            await AddOrUpdateUser(this.bot.sql, uid , args[0], args[1]);
        }
    }

    // Display usage of command
    getHelpMsg(): string {
        return "\n__Usage 1__:\n\n\t`!" + this.config.name + " Nom Corpo`\t\t *Ajouter un joueur exterieur à la corpo*" +
               "\n\n__Usage 2__:\n\n\t`!" + this.config.name + " @mention`\t\t *Ajouter un joueur de HC (peu utile)*" +
            "\n\n__Exemple__:\n\t```!" + this.config.name + " DarkAurel DarkHadesCorpo```";
    }
}

module.exports = AddUserCommand;