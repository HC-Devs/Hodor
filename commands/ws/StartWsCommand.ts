import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {CommandError} from "../../exceptions/CommandError";
import {StartWs} from "../../core/service/WsService";
import {Logger} from "../../utils/Logger";
import {FunctionnalError} from "../../exceptions/FonctionnalError";
import {BaseWsCommand} from "./BaseWsCommand";

export class AddWsCommand extends BaseWsCommand {

    protected constructor(bot: Bot) {
        super(bot, "startws", ['sws'], ['!'], 25000);
    }

    assertSyntax(message: Message, args: string[]) {
        if (1 < args.length) {
            throw new CommandError(this.getHelpMsg());
        }
    }

    async runCommand(message: Message, args: string[]) {
        // Get current date
        let cd = new Date();

        // Get hour and minute from current
        let h: number = cd.getHours();
        let m: number = cd.getMinutes();

        // Overrides hour and minute with user one if given
        if (args.length > 0) {
            try {
                h = Number(args[0].split(':')[0]);
                m = Number(args[0].split(':')[1]);
            } catch {
                throw new FunctionnalError("L'heure de début doit être de la forme HH:mm. Exemple 15:38");
            }
        }

        // Construct real start date
        let startDate = new Date(cd.getFullYear(), cd.getMonth(), cd.getDate(), h, m);
        await StartWs(this.bot.sql, startDate);

        message.channel.send(":white_check_mark: OK que la force soit avec vous").then((msg: Message) => {
            msg.delete(this.config.timeout).catch(reason => {
                Logger.error(reason);
            });
        });
    }

    // Display usage of command
    getHelpMsg(): string {
        return "\n__Usage __:\n\n\t`!" + this.config.name + "[HH:mm] `\t\t *Change le statut de la ws courante à Démarré; Possibilite de saisir l'heure exacte de démarrage*" +
            "\n\n__Exemple__:\n\t```!" + this.config.name + " 15:38```";
    }
}

module.exports = AddWsCommand;