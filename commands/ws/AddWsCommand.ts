import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {CommandError} from "../../exceptions/CommandError";
import {AddWs} from "../../core/service/WsService";
import {Logger} from "../../utils/Logger";
import {BaseWsCommand} from "./BaseWsCommand";

export class AddWsCommand extends BaseWsCommand {

    protected constructor(bot: Bot) {
        super(bot, "addws", ['newws'], ['!'], 25000);
    }

    assertSyntax(message: Message, args: string[]) {
        if (0 != args.length) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async runCommand(message: Message, args: string[]) {
        await AddWs(this.bot.sql)

        message.channel.send(":white_check_mark: OK").then((msg: Message) => {
            msg.delete(this.config.timeout).catch(reason => {
                Logger.error(reason);
            });
        });
    }

    // Display usage of command
    getHelpMsg(): string {
        return "\n__Usage __:\n\n\t`!" + this.config.name + " `\t\t *Crée une nouvelle WS. La précédante WS doit être démarrée*" +
            "\n\n__Exemple__:\n\t```!" + this.config.name + " ```";
    }
}

module.exports = AddWsCommand;