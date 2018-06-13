import { Message } from "discord.js";
import { Bot } from "../../Bot";
import { CommandError } from "../../exceptions/CommandError";
import { BaseCommand } from "../BaseCommand";
import { Config } from "../Config";
import { UnauthorizedAccessError } from "../../exceptions/UnauthorizedAccessError";
import { StartWs } from "../../core/service/WsService";
import { Logger } from "../../utils/Logger";
import { FunctionnalError } from "../../exceptions/FonctionnalError";



const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880", "413390615158718466"];
const allowedGuilds = [];

export class AddWsCommand extends BaseCommand {
    protected constructor(bot: Bot) {
        let config = new Config("startws", ['sws'], ['!'], 25000);
        super(bot, config);
    }

    assertIsGranted(message: Message) {
        if (!this.isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            throw new UnauthorizedAccessError();
        }
    }

    async run(message: Message, args: string[]) {
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
            } catch{
                throw new FunctionnalError("L'heure de début doit être de la forme HH:mm. Exemple 15:38");
            }
        }

        // Construct real start date
        let startDate = new Date(cd.getFullYear(), cd.getMonth(), cd.getDate(), h, m);
        await StartWs(this.bot.sql,startDate);

        message.channel.send(":white_check_mark: OK que la force soit avec vous").then((msg: Message) => {
            msg.delete(this.config.timeout).catch(reason => {
                Logger.error(reason);
            });
        });
    }

    assertSyntax(message: Message, args: string[]) {
        if (1 < args.length) {
            throw new CommandError(this.getHelpMsg());
        }
    }


    // Display usage of command
    getHelpMsg(): string {
        return "\n__Usage __:\n\n\t`!" + this.config.name + "[HH:mm] `\t\t *Change le statut de la ws courante à Démarré; Possibilite de saisir l'heure exacte de démarrage*" +
            "\n\n__Exemple__:\n\t```!" + this.config.name + " 15:38```";
    }
}

module.exports = AddWsCommand;