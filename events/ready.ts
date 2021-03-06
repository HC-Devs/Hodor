import {Logger} from "../utils/Logger";

module.exports = async bot => {
    Logger.log(`[READY] ${bot.client.user.tag} (${bot.client.user.id}), ready to serve ${bot.client.users.size} users in ${bot.client.channels.size} channels of ${bot.client.guilds.size} guilds.`, "ready");
    await bot.client.user.setActivity(`DEV`, {type: "PLAYING"});
    await bot.client.user.setUsername("Hodor_dev");
};