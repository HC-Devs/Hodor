/**
 * Helpers for DISCORD
 */
const Discord = require("discord.js");

class HELPERS {
    constructor(bot) {
        this.bot = bot;
    }

    discordAttachment(content, filename) {
        return new Discord.Attachment(Buffer.from(content), filename);
    }

    async getUser(guildID, search, strict) {
        const bot = this.bot;

        let userList = bot.client.guilds.get(guildID).members;

        let query = search.trim();
        let userDiscrim;

        // snow ?
        if (/\d{17,23}/.test(query)) {
            let userID = query.match(/(\d{17,23})/)[0];
            let userData = userList.get(userID);
            return userData || null;
        }

        if (/^.*#\d{4}$/.test(query)) {
            userDiscrim = query.match(/^.*#(\d{4}$)/)[1];
            query = query.substring(0, query.length - 5);
        }

        if (userDiscrim) {
            userList = userList.filter(u => u.user.discriminator == userDiscrim);
        }

        userList = userList.filter(u => {
            let nameSearch = u.user.username && u.user.username.toLowerCase().includes(query.toLowerCase());
            let nickSearch = u.nick && u.nick.toLowerCase().includes(query.toLowerCase());
            return nameSearch || nickSearch;
        });

        if (userList.size == 0) {
            return null;
        }
        else if (userList.size == 1) {
            return userList.first();
        }

        if (strict === true) {
            return null;
        }

        return userList;
    }

    async getChannel(guildID, search) {
        const bot = this.bot;

        let channelList = bot.client.guilds.get(guildID).channels;

        let query = search.trim();

        // snow ?
        if (/\d{17,23}/.test(query)) {
            let channelID = query.match(/(\d{17,23})/)[0];
            return channelList.get(channelID);
        }

        channelList = channelList.filter(c => {
            return c.name && c.name.toLowerCase().includes(query.toLowerCase());
        });

        if (channelList.size == 0) {
            return null;
        }
        else if (channelList.size == 1) {
            return channelList.first();
        }

        return null;
    }

    async getRole(guildID, search) {
        const bot = this.bot;

        let roleList = bot.client.guilds.get(guildID).roles;

        let query = search.trim();

        // snow ?
        if (/\d{17,23}/.test(query)) {
            let roleID = query.match(/(\d{17,23})/)[0];
            return roleList.get(roleID);
        }

        roleList = roleList.filter(r => {
            return r.name && r.name.toLowerCase().includes(query.toLowerCase());
        });

        if (roleList.size == 0) {
            return null;
        }
        else if (roleList.size == 1) {
            return roleList.first();
        }

        return null;
    }
}

module.exports = HELPERS;
