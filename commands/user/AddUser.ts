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

export class AddUser extends BaseCommand {

    protected constructor(bot: Bot, aliases = [], prefix = ["!"], timeout = 5000) {
        let config = new Config('adduser', aliases, prefix, timeout);
        super(bot, config);
    }

    assertIsGranted(message: Message){
        if (!this.isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            throw new UnauthorizedAccessError();
        }
    }

    assertSyntax(args: string[]){
        // Check command as correct number of arguments
        if (args.length < 2 && args.length > 3) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async run(message: Message, args: string[]) {
        
        let [usersId, argsCleaned] = this.cleanArgs(message ,args);
        let memberId: Snowflake =  usersId.length> 0?  usersId.pop() : message.author.id;

        await AddOrUpdateUser(this.bot.sql, memberId, argsCleaned[0], argsCleaned[1]);
        message.reply("Maj ok").then((msg: Message) => msg.delete(this.config.timeout));
      
    }

 
    // Display usage of command
    getHelpMsg(): string {
        return "Usage:\n\t```!" + this.config.name + " Nom Corpo````" +
            "Exemple:\n\t```!" + this.config.name + " Aurel HadesCorpo````";
    }
}

module.exports = AddUser;