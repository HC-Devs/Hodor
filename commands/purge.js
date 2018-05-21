/* Vars */

/* Libs */

/* Rights */
const allowedUsers = botOwner;
const allowedRoles = [];
const allowedChannels = [];
const allowedGuilds = [];

/* - */
const command = "purge";

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

        const limit = (args[0] && !isNaN(parseInt(args[0]))) ? parseInt(args[0]) : -1;
        const options = limit === -1 ? {} : {limit: limit, before: message.id};

        message.channel.fetchMessages(options).then(messages => {
            message.channel.bulkDelete(messages);
        }).catch(reason => {
            message.reply(`Couldn't delete messages because of: ${reason}`);
            this.bot.logger.error(reason);
        }).then(() => {
            message.delete().catch(reason => {
                this.bot.logger.error(reason);
            });
        });
    }
}

/* Export */
module.exports = CMD_OMEGA;

/*const conf = {
    enabled: true,
    permLevel: "Bot Admin",
    name: "purge",
    category: "System",
    description: "Delete a defined number of messages",
    usage: "purge (-option | --option) [number]",
    options: {
        "-a, --all": "Delete up to 50 messages at a time (limited by discord)",
        "-n, --number": "Define a number between 0 and 50"
    }
};*/