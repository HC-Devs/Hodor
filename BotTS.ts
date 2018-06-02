import * as logger from "./utils/Logger.js";
import {Client} from "discord.js";
import {Command} from "./commands/Command";
import {Config} from "./Config";
import * as fs from "fs";

//const fs = require("fs");
//const path = require("path");

const allowedBots = [];
const allowedGuilds = [
    "413390615158718464",
    "420194593167114250"  // Test
];

export class BotTS {
    client: Client;
    commands: Array<Command>;
    events: Array<any>;
    crons: Array<any>;
    functions: Array<any>;
    helpers: Array<any>;
    sql: any;
    queries: any;

    constructor(client: Client) {
        this.client = client;

        // Bot owner
        if (Config.botOwner.length === 0 || Config.botOwner.length[0] === "") {
            logger.error("No owner set");
            process.exit(1);
        }

        // Prefix
        let prefix = Config.nodeEnv !== "dev" ? Config.prefix : Config.prefixDev;
        if (prefix === "") {
            logger.error("No prefix set");
            process.exit(1);
        }

        // Database directory
        if (!fs.existsSync(Config.dataBaseDir)) {
            logger.log(`create '${Config.dataBaseDir}'`);
            fs.mkdirSync(Config.dataBaseDir);
        }
    }

    async init() {
    }

    async watch() {
    }
}