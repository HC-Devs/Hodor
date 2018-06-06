import {BotTS} from "../BotTS";
import {Message} from "discord.js";

export abstract class BaseCommand {

    bot: BotTS;
    config: any;

    protected constructor(bot: BotTS, config: any) {
        this.bot = bot;
        this.config = config;
    }

    abstract async run(message: Message, args: any);

    protected isGranted(message: Message, allowedGuilds: Array<string>, allowedChannels: Array<string>, allowedRoles: Array<string>, allowedUsers: Array<string>): boolean {
        // check guilds
        if (allowedGuilds.length > 0 && allowedGuilds.indexOf(message.guild.id) === -1) return false;

        // check users
        if (allowedUsers.length > 0 && allowedUsers.indexOf(message.author.id) === -1) return false;

        // check roles
        if (allowedRoles.length > 0 && !message.member.roles.some(r => allowedRoles.indexOf(r.name) !== -1)) return false;

        // check channels
        if (allowedChannels.length > 0 && allowedChannels.indexOf(message.channel.id) === -1) return false;


        return true;
    }

}