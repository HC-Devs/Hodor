import * as logger from "./utils/Logger.js";
import {Client, ClientOptions} from "discord.js";
import {BotTS} from "./BotTS";
import {Config} from "./Config";

if (Config.nodeVersion < 9) {
    throw new Error("Node 9.0.0 or higher is required. Update Node on your system.");
}
process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error(`Uncaught Exception: ${errorMsg}`);
    process.exit(1);
});
process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at:", p, "reason:", reason);
});

const discordOptions: ClientOptions = {
    disabledEvents: ["TYPING_START", "VOICE_STATE_UPDATE", "VOICE_SERVER_UPDATE"]
};
const client: Client = new Client(discordOptions);
const bot: BotTS = new BotTS(client);

bot.init().then(async () => {
    if (Config.nodeEnv === "dev") {
        bot.watch().then(() => {
            logger.log("Chokidar initialized", "success")
        });
    }
    if (!Config.token) {
        throw new Error("Missing 'BOT_TOKEN' environment variable");
    }
    setInterval(() => {
        Object.keys(bot.crons).forEach(function (key) {
            let cron = bot.crons[key];
            cron.run();
        });
    }, 60000);
    await client.login(Config.token);

}).then(() => {
    if (Config.nodeDomain && Config.nodePort) {
        const express = require('express');
        const http = require('http');
        const app = express();
        app.get("/", (request, response) => {
            let d = new Date();
            response.setHeader("Content-Type", "text/html");
            response.write(d.toString());
            response.end();
        });
        app.listen(Config.nodePort);
        setInterval(() => {
            http.get(`http://${Config.nodeDomain}.glitch.me/`);
        }, 240000);
    }
});