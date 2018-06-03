const logger = require("../utils/Logger.js");

module.exports = async bot => {
    logger.log(`[READY] ${bot.client.user.tag} (${bot.client.user.id}), ready to serve ${bot.client.users.size} users in ${bot.client.channels.size} channels of ${bot.client.guilds.size} guilds.`, "ready");
    await bot.client.user.setActivity(`DEV`, {type: "PLAYING"});
    await bot.client.user.setUsername("Hodor_dev");
};