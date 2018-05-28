import fi = require ('../core/service/userservice');
/* Vars */

/* Libs */

/* Rights */
const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = [];
const allowedGuilds = [];

/* - */
const command = "test";

/* Class */
class CMD_TEST {
    bot : any;
    _config : any;

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
        const deleteMessageTime = (30 * 1000);

        message.channel.send(":white_check_mark: OK").then(msg => msg.delete(deleteMessageTime));

       
        let r = await fi.ListUser(this.bot.sql);
        message.channel.send(r);
    }
}

/* Export */
module.exports = CMD_TEST;