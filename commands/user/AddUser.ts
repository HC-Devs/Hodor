import {BaseCommand} from "../BaseCommand";
import {Message, Snowflake} from "discord.js";
import {Bot} from "../../Bot";
import {Logger} from "../../utils/Logger";
import {Config} from "../Config";
import { UnauthorizedAccessError } from "../../exceptions/UnauthorizedAccessError";
import { CommandError } from "../../exceptions/CommandError";
import { AddOrUpdateUser } from "../../core/service/UserService";
import { FunctionnalError } from "../../exceptions/FonctionnalError";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880", "413390615158718466"];
const allowedGuilds = [];

export class AddUserCommand extends BaseCommand {

    protected constructor(bot: Bot, aliases = [], prefix = ["!"], timeout = 5000) {
        let config = new Config('AddUser', aliases, prefix, timeout);
        super(bot, config);
    }

    assertIsGranted(message: Message){
        if (!this.isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            throw new UnauthorizedAccessError();
        }
    }

    assertSyntax(args: string[]){
        // Check command as correct number of arguments
        if (args.length < 2 && args.length > 2) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async run(message: Message, args: string[]) {
        let memberId: Snowflake = message.mentions.users.first() ? message.mentions.users.first().id : message.author.id;

        const ok = await AddOrUpdateUser(this.bot.sql, memberId, args[0], args[1]);
        if(ok){
            message.reply("Maj ok").then((msg: Message) => msg.delete(this.config.timeout));
        }else{
            throw new FunctionnalError("Erreur leur de la mise à jour de la base de données");
        }
    }

 
    // Display usage of command
    getHelpMsg(): string {
        return "Usage:\n\t```!" + this.config.name + " level````" +
            "Exemple:\n\t```!" + this.config.name + " Aurel````";
    }


}