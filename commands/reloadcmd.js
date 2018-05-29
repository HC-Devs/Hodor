/* Vars */

/* Libs */

/* Rights */

/* - */
const command = "reloadcmd";

/* Class */
class CMD_RELOAD_CMD {
    constructor(bot) {
        this.bot = bot;

        this.config = {
            name: command,
            prefix: ["!"],
            timeout: 5000
        };
    }

    async run(message, args) {
        message.delete(5000);

        if (global.botOwner.indexOf(message.author.id) === -1 || args.length !== 1) {
            return;
        }

        let cmdContent = this.bot.reloadCommand(args[0]);

        if (cmdContent !== false) {
            console.log(`command ${args[0]} reloaded !`);
            this.bot.commands[args[0]] = new cmdContent(this.bot);
        }
    }
}

/* Export */
module.exports = CMD_RELOAD_CMD;