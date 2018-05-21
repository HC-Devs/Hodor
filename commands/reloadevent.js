/* Vars */

/* Libs */

/* Rights */

/* - */
const command = "reloadevent";

/* Class */
class CMD_RELOAD_EVENT {
    constructor(bot) {
        this.bot = bot;

        this._config = {
            name: command,
            prefix: ["!"],
            timeout: 5000
        };
    }

    async run(message, args) {
        const deleteMessageTime = (5 * 1000);

        if (botOwner.indexOf(message.author.id) === -1 || args.length !== 1) {
            return;
        }

        let eventContent = this.bot.reloadEvent(args[0]);
        if (eventContent !== false) {
            message.channel.send(":white_check_mark: OK").then(msg => msg.delete(deleteMessageTime));
            this.bot.logger.log(`event ${args[0]} reloaded !`, 'success');
        }
    }
}

/* Export */
module.exports = CMD_RELOAD_EVENT;