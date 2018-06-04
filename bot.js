class Bot {
    async init() {
        /* Functions */
        const FUNCTIONS = require("./classes/functions.js");
        this.functions = new FUNCTIONS(this);

        /* Discord Helpers */
        const HELPERS = require("./classes/helpers.js");
        this.helpers = new HELPERS(this);

        /* MySQL */
        const SQLITE = require("./classes/sqlite.js");
        this.sql = new SQLITE(this);

        /* Queries */
        const QUERIES = require("./classes/queries.js");
        this.queries = new QUERIES(this);

        return this;
    }

    async watch() {
        chokidar.watch("classes/", watchOptions).on("change", (event) => {
            let className = path.basename(event, path.extname(event));
            let classContent = BOT.reloadClass(event);

            if (["functions", "helpers", "sqlite", "queries"].indexOf(className) !== -1) {
                if (className === "sqlite") this.sql = new classContent(this);
                if (className === "helpers") this.helpers = new classContent(this);
                if (className === "queries") this.queries = new classContent(this);
                if (className === "functions") this.functions = new classContent(this);

                this.logger.log(`chokidar: class ${className} reloaded !`);
            }
        });

        chokidar.watch("commands/", watchOptions).on("change", (event) => {
            let className = path.basename(event, path.extname(event));
            let classContent = BOT.reloadCommand(event);
            this.commands[className] = new classContent(this);

            this.logger.log(`chokidar: command ${className} reloaded !`);
        });

        chokidar.watch("crons/", watchOptions).on("change", (event) => {
            let className = path.basename(event, path.extname(event));
            let classContent = BOT.reloadCron(event);
            this.crons[className] = new classContent(this);

            this.logger.log(`chokidar: cron ${className} reloaded !`);
        });

        chokidar.watch("events/", watchOptions).on("change", (event) => {
            let className = path.basename(event, path.extname(event));
            let eventContent = BOT.reloadEvent(event);
            if (eventContent !== false) {
                this.logger.log(`chokidar: event ${className} reloaded !`);
            }
        });
    }

    async parseMessage(oldMessage, newMessage) {
        // dm message not allowed
        if (newMessage.channel.type === "dm") return;

        // message from bot, is bot allowed ?
        if (newMessage.author.bot && allowedBots.indexOf(newMessage.author.id) === -1) return;

        // guild allowed
        if (allowedGuilds.indexOf(newMessage.guild.id) === -1) {
            this.logger.error("Bot is not allowed in " + newMessage.guild.name + " (" + newMessage.guild.id + ")");
            return;
        }

        // check prefix
        let prefix = process.env.NODE_ENV !== "dev" ? process.env.BOT_PREFIX : process.env.BOT_PREFIX_DEV;
        if (newMessage.content.indexOf(prefix) !== 0) return;
        newMessage.prefix = prefix;

        // retrieve command & args
        const args = newMessage.content.slice(newMessage.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (typeof this.commands[command] !== "undefined" && typeof this.commands[command].run !== "undefined") {
            let cmd = this.commands[command];
            if ((process.env.NODE_ENV !== "dev" && cmd.config.prefix.indexOf(newMessage.prefix) !== -1) || (process.env.NODE_ENV === "dev" && global.botOwner.indexOf(newMessage.author.id) !== -1)) {
                if (cmd.config.timeout > 0) {
                    newMessage.delete(cmd.config.timeout).catch(reason => {
                        this.logger.error(reason);
                    });
                }
                else if (cmd.config.timeout === -1) {
                    newMessage.delete().catch(reason => {
                        this.logger.error(reason);
                    });
                }
                cmd.run(newMessage, args);
                this.logger.cmd(`[CMD] ${newMessage.author.username} (${newMessage.author.id}) ran command ${cmd.config.name}`);
            }
        }
    }

    static reloadClass(className) {
        const f = "./" + className;

        if (fs.existsSync(f)) {
            delete require.cache[require.resolve(f)];
            return require(f);
        }

        return false;
    }

    static reloadCommand(commandName) {
        const f = "./" + commandName;

        if (fs.existsSync(f)) {
            delete require.cache[require.resolve(f)];
            return require(f);
        }

        return false;
    }

    static reloadCron(cronName) {
        const f = "./" + cronName;

        if (fs.existsSync(f)) {
            delete require.cache[require.resolve(f)];
            return require(f);
        }

        return false;
    }

    static reloadEvent(eventName) {
        const f = "./" + eventName;

        if (fs.existsSync(f)) {
            delete require.cache[require.resolve(f)];
            return require(f);
        }

        return false;
    }
}