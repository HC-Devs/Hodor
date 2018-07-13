import {Client, ClientOptions} from "discord.js";
import {Bot} from "./Bot";
import {Global} from "./utils/Global";

if (Global.nodeVersion < 8) {
    throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");
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
const bot: Bot = new Bot(client);

bot.init().then(async () => {
    if (!Global.token) {
        throw new Error("Missing 'BOT_TOKEN' environment variable");
    }
    setInterval(() => {
        //TODO execute cron jobs here
        /*Object.keys(bot.crons).forEach(function (key) {
            let cron = bot.crons[key];
            cron.run();
        });*/
    }, 60000);
    await client.login(Global.token);

}).then(() => {
    if (Global.nodeDomain && Global.nodePort) {
        const express = require('express');
        const http = require('http');
        const app = express();
        app.get("/", (request, response) => {
            let d = new Date();
            response.setHeader("Content-Type", "text/html");
            response.write(d.toString());
            response.end();
        });
        app.listen(Global.nodePort);
        setInterval(() => {
            http.get(`http://${Global.nodeDomain}.glitch.me/`);
        }, 240000);
    }
});