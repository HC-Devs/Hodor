import {Client, ClientOptions} from "discord.js";
import {BotTS} from "./BotTS";

if (Number(process.version.slice(1).split(".")[0]) < 9) {
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
    if (process.env.NODE_ENV === "dev") {
        bot.watch().then(() => {
            bot.logger.log("Chokidar initialized", "success")
        });
    }
    if (!process.env.BOT_TOKEN) {
        throw new Error("Missing 'BOT_TOKEN' environment variable");
    }
    setInterval(() => {
        Object.keys(bot.crons).forEach(function (key) {
            let cron = bot.crons[key];
            cron.run();
        });
    }, 60000);
    await client.login(process.env.BOT_TOKEN);

}).then(() => {
    if (process.env.PORT && process.env.PROJECT_DOMAIN) {
        const express = require('express');
        const http = require('http');
        const app = express();
        app.get("/", (request, response) => {
            let d = new Date();
            response.setHeader("Content-Type", "text/html");
            response.write(d.toString());
            response.end();
        });
        app.listen(process.env.PORT);
        setInterval(() => {
            http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
        }, 240000);
    }
});