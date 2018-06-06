"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require("../utils/Logger.js");
const Config_1 = require("../Config");
const BaseCommand_1 = require("./BaseCommand");
const allowedUsers = Config_1.Config.botOwner;
const allowedRoles = [];
const allowedChannels = [];
const allowedGuilds = [];
class Purge extends BaseCommand_1.BaseCommand {
    constructor(bot) {
        let config = {
            name: "purge",
            prefix: ['!'],
            timeout: 5000
        };
        super(bot, config);
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            // check command permissions
            if (!this.isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
                return;
            }
            const limit = (args[0] && !isNaN(parseInt(args[0]))) ? parseInt(args[0]) : -1;
            const options = limit === -1 ? {} : { limit: limit, before: message.id };
            message.channel.fetchMessages(options).then(messages => {
                message.channel.bulkDelete(messages);
            }).catch(reason => {
                message.reply(`Couldn't delete messages because of: ${reason}`).then(() => {
                    logger.error(reason);
                });
            }).then(() => {
                message.delete().catch(reason => {
                    logger.error(reason);
                });
            });
        });
    }
}
exports.Purge = Purge;
module.exports = Purge;
//# sourceMappingURL=Purge.js.map