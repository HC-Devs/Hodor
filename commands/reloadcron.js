/* Vars */

/* Libs */

/* Rights */

/* - */
const command = "reloadcron";

/* Class */
class CMD_RELOAD_CRON {
    constructor(bot) {
        this.bot = bot;

        this._config = {
            name: command,
            prefix: ["!"],
            timeout: 5000
        };
    }

    async run(message, args) {
        message.delete(5000);

        if (botOwner.indexOf(message.author.id) === -1 || args.length !== 1) {
            return;
        }

        let cronContent = this.bot.reloadCron(args[0]);

        if (cronContent !== false) {
            console.log(`cron ${args[0]} reloaded !`);
            this.bot.crons[args[0]] = new cronContent(this.bot);
        }
    }
}

/* Export */
module.exports = CMD_RELOAD_CRON;