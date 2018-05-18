/*if (command == "reloadcron") {
    message.delete(5000);

    if (botOwner.indexOf(message.author.id) == -1 || args.length != 1) {
        return;
    }

    let cronContent = reloadCron(args[0]);

    if (cronContent !== false) {
        console.log(`cron ${args[0]} reloaded !`);
        bot.crons[args[0]] = new cronContent(bot);
    }
}*/