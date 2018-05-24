/* Vars */

/* Libs */

/* Rights */
const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];
const allowedGuilds = [];

/* - */
const command = "barrage";

/* Class */
class CMD_BARRAGE {
    constructor(bot) {
        this.bot = bot;

        this.config = {
            name: command,
            prefix: ["!"],
            timeout: 5000
        };
    }

    async run(message, args) {
        // check guilds
        if (allowedGuilds.length > 0 && allowedGuilds.indexOf(message.guild.id) === -1) return;

        // check users
        if (allowedUsers.length > 0 && allowedUsers.indexOf(message.author.id) === -1) return;

        // check roles
        if (allowedRoles.length > 0 && !message.member.roles.some(r => allowedRoles.includes(r.name))) return;

        // check channels
        if (allowedChannels.length > 0 && allowedChannels.indexOf(message.channel.id) === -1) return;

        // check arguments count
        if (args.length !== 1) return;

        const level = args[0] && !isNaN(parseInt(args[0])) ? parseInt(args[0]) : -1;
        if (level === -1 || !this.bot.functions.between(level, 1, 10)) {
            message.channel.send(":x: KO").then(msg => msg.delete(this.config.timeout));
            return;
        }

        message.channel.send(":white_check_mark: OK").then(msg => msg.delete(this.config.timeout));
    }
}

/* Export */
module.exports = CMD_BARRAGE;