import {BotTS} from "../../BotTS";
import {BaseModuleCommand} from "../BaseModuleCommand";
import {Message} from "discord.js";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];
const allowedGuilds = [];

export class Bonus extends BaseModuleCommand {

    constructor(bot: BotTS) {
        super(bot, "bonus");
    }

    async runCommand(message: Message, level: Number, user: string) {
        //TODO 
        // 1. get userservice or commandservice
        // 2. check if module exist and update or insert value in UserModule table
    }

    // async run(message, args) {
    //     /*
    //     // check command permissions
    //     if (!this.bot.functions.isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
    //         return;
    //     }

    //     // check arguments count
    //     if (args.length !== 1) return;

    //     // check command level
    //     const level = args[0] && !isNaN(parseInt(args[0])) ? parseInt(args[0]) : -1;
    //     if (level === -1 || !this.bot.functions.between(level, 1, this.config.maxLevel)) {
    //         // TODO show command usage
    //         message.channel.send(":x: KO").then(msg => msg.delete(this.config.timeout));
    //         return;
    //     }

    //     let memberId = message.mentions.users.first() ? message.mentions.users.first().id : message.author.id;
    //     // TODO set command level to DB & show success message

    //     message.channel.send(":white_check_mark: OK").then(msg => msg.delete(this.config.timeout));
    //     */
    // }
}

module.exports = Bonus;