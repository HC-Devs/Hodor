/* Vars */

/* Libs */

/* Rights */

/* - */
const command = "reloadclass";

/* Class */
class CMD_RELOAD_CLASS {
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

        if (global.botOwner.indexOf(message.author.id) === -1 || args.length !== 1) {
            return;
        }

        if (["sqlite", "functions", "helpers", "queries"].indexOf(args[0]) !== -1) {
            let classContent = this.bot.reloadClass(args[0]);

            if (classContent !== false) {
                console.log(`class ${args[0]} reloaded !`);

                if (args[0] === "sqlite") this.bot.sql = new classContent(this.bot);
                if (args[0] === "helpers") this.bot.helpers = new classContent(this.bot);
                if (args[0] === "queries") this.bot.queries = new classContent(this.bot);
                if (args[0] === "functions") this.bot.functions = new classContent(this.bot);
            }
        }
    }
}

/* Export */
module.exports = CMD_RELOAD_CLASS;