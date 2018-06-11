import {BaseCommand} from "../BaseCommand";
import {Message, Snowflake} from "discord.js";
import {Bot} from "../../Bot";
import {Logger} from "../../utils/Logger";
import {Config} from "../Config";
import { UnauthorizedAccessError } from "../../exceptions/UnauthorizedAccessError";
import { CommandError } from "../../exceptions/CommandError";
import { AddOrUpdateUser, ListUser } from "../../core/service/UserService";
import { FunctionnalError } from "../../exceptions/FonctionnalError";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880", "413390615158718466"];
const allowedGuilds = [];

export class ListUserCommand extends BaseCommand {

    protected constructor(bot: Bot, aliases = ['lu'], prefix = ["!"], timeout = 25000) {
        let config = new Config('listuser', aliases, prefix, timeout);
        super(bot, config);
    }

    assertIsGranted(message: Message){
        if (!this.isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            throw new UnauthorizedAccessError();
        }
    }

    assertSyntax(args: string[]){
        // Check command as correct number of arguments
        if (args.length > 1) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async run(message: Message, args: string[]) {

        let corpoName =  args.length> 0?  args.pop() : null;

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