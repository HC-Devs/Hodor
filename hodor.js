/* Discord */
const Discord = require("discord.js");
const discordOptions = {
    disabledEvents: ["TYPING_START", "VOICE_STATE_UPDATE", "VOICE_SERVER_UPDATE"]
};
const client = new Discord.Client(discordOptions);

//exports.init =  async () => {
     try{
    console.time("startBot");

    const BOT = require("./bot.js");
    const bot = new BOT(client);
    bot.init().then(b => {

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

    client.login(process.env.BOT_TOKEN).then( () => console.timeEnd("startBot"));
});
} catch (e) {
    console.log("failed" + e );
}
