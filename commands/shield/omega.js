/* Vars */

/* Libs */

/* Rights */
const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];
const allowedGuilds = [];

/* - */
const command = "omega";

/* Class */
class CMD_OMEGA {
    constructor(bot) {
        this.bot = bot;

        this._config = {
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

        // constants
        const bot = this.bot;

        const guildID = message.guild.id;
        const channelID = message.channel.id;
        const authorID = message.author.id;

        // command
        const deleteMessageTime = (5 * 1000);

        message.channel.send(":white_check_mark: OK").then(msg => msg.delete(deleteMessageTime));
    }
}

/* Export */
module.exports = CMD_OMEGA;