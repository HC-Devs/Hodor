"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const Command_1 = require("../Command");
const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880"];
const allowedGuilds = [];

class Bonus extends Command_1.Command {
    constructor(bot) {
        let config = {
            name: "bonus",
            prefix: ["!"],
            timeout: 5000,
            maxLevel: 10
        };
        super(bot, config);
    }

    test() {
    }
}

exports.Bonus = Bonus;
module.exports = Bonus;
//# sourceMappingURL=Bonus.js.map