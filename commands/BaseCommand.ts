import {Bot} from "../Bot";
import {Message} from "discord.js";
import {Config} from "./Config";

export abstract class BaseCommand {

    bot: Bot;
    config: Config;

    protected constructor(bot: Bot, config: Config) {
        this.bot = bot;
        this.config = config;
    }

    abstract assertIsGranted(message: Message);

    abstract assertSyntax(message: Message, args: string[]);

    abstract async run(message: Message, args: string[]);

    protected isGranted(message: Message, allowedGuilds: Array<string>, allowedChannels: Array<string>, allowedRoles: Array<string>, allowedUsers: Array<string>): boolean {
        return (allowedGuilds.length > 0 && allowedGuilds.indexOf(message.guild.id) !== -1) ||
            (allowedChannels.length > 0 && allowedChannels.indexOf(message.channel.id) !== -1) ||
            (allowedRoles.length > 0 && message.member.roles.some(r => allowedRoles.indexOf(r.name) !== -1)) ||
            (allowedUsers.length > 0 && allowedUsers.indexOf(message.author.id) !== -1);
    }

    protected cleanArgs(message: Message, args: string[]): [string [], string []] {
        let mentions = message.mentions.users;
        let userIdMention: string[] = [];
        if (mentions && mentions.size > 0) {
            mentions.forEach((v, k) => userIdMention.push(v.id));
        }
        let newArgs = args.filter(elt => !(elt.startsWith('<@') && elt.endsWith('>') && userIdMention.indexOf(elt.substr(2, elt.length - 3)) != -1));

        return [userIdMention, newArgs];
    }

    // Virtual method that could be overrided
    // Display usage of command
    public getHelpMsg(): string {
        return "Usage:\n\t```!" + this.config.name + " argument````" +
            "Exemple:\n\t```!" + this.config.name + " argument````";
    }
}