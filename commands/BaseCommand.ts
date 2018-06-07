import {Bot} from "../Bot";
import {Message} from "discord.js";

export abstract class BaseCommand {

    bot: Bot;
    config: any;

    protected constructor(bot: Bot, config: any) {
        this.bot = bot;
        this.config = config;
    }

    abstract async run(message: Message, args: any);

    protected isGranted(message: Message, allowedGuilds: Array<string>, allowedChannels: Array<string>, allowedRoles: Array<string>, allowedUsers: Array<string>): boolean {
        return (allowedGuilds.length > 0 && allowedGuilds.indexOf(message.guild.id) !== -1) ||
            (allowedChannels.length > 0 && allowedChannels.indexOf(message.channel.id) !== -1) ||
            (allowedRoles.length > 0 && message.member.roles.some(r => allowedRoles.indexOf(r.name) !== -1)) ||
            (allowedUsers.length > 0 && allowedUsers.indexOf(message.author.id) !== -1);
    }
}