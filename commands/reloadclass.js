/*if (command == "reloadclass") {
    message.delete(5000);

    if (botOwner.indexOf(message.author.id) == -1 || args.length != 1) {
        return;
    }

    if (["sqlite", "functions", "helpers", "queries"].indexOf(args[0]) != -1) {
        let classContent = reloadClass(args[0]);

        if (classContent !== false) {
            console.log(`class ${args[0]} reloaded !`);

            if (args[0] == "sqlite") bot.sql = new classContent(bot);
            if (args[0] == "helpers") bot.helpers = new classContent(bot);
            if (args[0] == "queries") bot.queries = new classContent(bot);
            if (args[0] == "functions") bot.functions = new classContent(bot);
        }
    }
}*/