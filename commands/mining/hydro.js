/* Vars */

/* Libs */

/* Rights */
const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];
const allowedGuilds = [];

/* - */
const command = "hydro";

/* Class */
class CMD_HYDRO {
    constructor(bot) {
        this.bot = bot;

        this.config = {
            name: command,
            prefix: ["!"],
            timeout: 5000,
            maxLevel: 10
        };
    }

    async run(message, args) {
        // check command permissions
        if (!this.bot.functions.isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            return;
        }

        // check arguments count
        if (args.length !== 1) return;

        // check command level
        const level = args[0] && !isNaN(parseInt(args[0])) ? parseInt(args[0]) : -1;
        if (level === -1 || !this.bot.functions.between(level, 1, this.config.maxLevel)) {
            // TODO show command usage
            message.channel.send(":x: KO").then(msg => msg.delete(this.config.timeout));
            return;
        }

        // TODO set command level to DB & show success message

        message.channel.send(":white_check_mark: OK").then(msg => msg.delete(this.config.timeout));
    }
}

/* Export */
module.exports = CMD_HYDRO;