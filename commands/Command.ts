import {BotTS} from "../BotTS";

export abstract class Command {

    bot: BotTS;
    config: any;

    protected constructor(bot: BotTS, config: any) {
        this.bot = bot;
        this.config = config;
    }
}