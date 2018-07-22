import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {CommandError} from "../../exceptions/CommandError";
import {EndWs} from "../../core/service/WsService";
import {Logger} from "../../utils/Logger";
import {BaseWsCommand} from "./BaseWsCommand";

export class LostWsCommand extends BaseWsCommand {

    protected constructor(bot: Bot) {
        super(bot, "lostws", ['lows'], ['!'], 25000);
    }

    assertSyntax(message: Message, args: string[]) {
        if (0 != args.length) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async runCommand(message: Message, args: string[]) {
        await EndWs(this.bot.sql, false);

        message.channel.send(":white_check_mark: OK looser").then((msg: Message) => {
            msg.delete(this.config.timeout).catch(reason => {
                Logger.error(reason);
            });
        });
    }

    // Display usage of command
    getHelpMsg(): string {
        return "\n__Usage __:\n\n\t`!" + this.config.name + " `\t\t *Change le statut de la ws courante à PERDUE*" +
            "\n\n__Exemple__:\n\t```!" + this.config.name + " ```";
    }
}

module.exports = LostWsCommand;