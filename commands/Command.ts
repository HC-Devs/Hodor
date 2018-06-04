import {BotTS} from "../BotTS";
import {Message} from "discord.js";

export abstract class Command {

    bot: BotTS;
    config: any;

    protected constructor(bot: BotTS, config: any) {
        this.bot = bot;
        this.config = config;
    }

    abstract async run(message: Message, args: any);
}