module.exports = async (bot, oldMessage, newMessage) => {
    await bot.parseMessage(oldMessage, newMessage);
};