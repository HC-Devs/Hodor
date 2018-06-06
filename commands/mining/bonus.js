"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {value: true});
const BaseModuleCommand_1 = require("../BaseModuleCommand");
const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];
const allowedGuilds = [];
class Bonus extends BaseModuleCommand_1.BaseModuleCommand {
    constructor(bot) {
        super(bot, "bonus");
    }
    runCommand(level, user) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO 
            // 1. get userservice or commandservice
            // 2. check if module exist and update or insert value in UserModule table
        });
    }
}
exports.Bonus = Bonus;
module.exports = Bonus;
//# sourceMappingURL=bonus.js.map