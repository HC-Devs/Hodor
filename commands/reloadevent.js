/*if (command == "reloadevent") {
    message.delete(5000);

    if (botOwner.indexOf(message.author.id) == -1 || args.length != 1) {
        return;
    }

    let eventContent = reloadEvent(args[0]);

    if (eventContent !== false) {
        console.log(`event ${args[0]} reloaded !`);
        bot.events[args[0]] = new eventContent(bot);
    }
}*/