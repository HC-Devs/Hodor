/* Vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor(bot) {
        this.bot = bot;
        this.config = {
            name: command,
            prefix: ["!"],
            timeout: 5000
        };
        this.service = require('../core/service/UserService.ts');
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            // check guilds
            if (allowedGuilds.length > 0 && allowedGuilds.indexOf(message.guild.id) === -1)
                return;
            // check users
            if (allowedUsers.length > 0 && allowedUsers.indexOf(message.author.id) === -1)
                return;
            // check roles
            if (allowedRoles.length > 0 && !message.member.roles.some(r => allowedRoles.includes(r.name)))
                return;
            // check channels
            if (allowedChannels.length > 0 && allowedChannels.indexOf(message.channel.id) === -1)
                return;
            // constants
            const bot = this.bot;
            const guildID = message.guild.id;
            const channelID = message.channel.id;
            const authorID = message.author.id;
            // command
            const deleteMessageTime = (30 * 1000);
            message.channel.send(":white_check_mark: OK").then(msg => msg.delete(deleteMessageTime));
            let r = yield this.service.ListUser(this.bot.sql);
            message.channel.send(r);
            r = yield this.service.TestUser(this.bot.sql);
            message.channel.send(r);
        });
    }
}
/* Export */
module.exports = CMD_TEST;
//# sourceMappingURL=test.js.map