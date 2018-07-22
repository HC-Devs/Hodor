import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {CommandError} from "../../exceptions/CommandError";
import {PrepareWs} from "../../core/service/WsService";
import {Logger} from "../../utils/Logger";
import {BaseWsCommand} from "./BaseWsCommand";

export class PrepareWsCommand extends BaseWsCommand {

    protected constructor(bot: Bot) {
        super(bot, "preparews", ['pws'], ['!'], 25000);
    }

    assertSyntax(message: Message, args: string[]) {
        if (0 != args.length) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async runCommand(message: Message, args: string[]) {
        await PrepareWs(this.bot.sql);

        message.channel.send(":white_check_mark: OK bonne préparation").then((msg: Message) => {
            msg.delete(this.config.timeout).catch(reason => {
                Logger.error(reason);
            });
        });
    }

    // Display usage of command
    getHelpMsg(): string {
        return "\n__Usage __:\n\n\t`!" + this.config.name + " `\t\t *Change le statut de la ws courante à En préparation*" +
            "\n\n__Exemple__:\n\t```!" + this.config.name + " ```";
    }
}

module.exports = PrepareWsCommand;