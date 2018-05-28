/* Vars */
global.botOwner = process.env.BOT_OWNER.split(",") || [];

/* Libs */
const fs = require("fs");
const path = require("path");

const allowedBots = [];
const allowedGuilds = [
    "413390615158718464",
    "420194593167114250"  // Test
];

class BOT {
    constructor(client) {
        this.client = client;
        this.logger = require('./utils/Logger.js');

        /* Checks */
        if (botOwner.length === 0 || botOwner[0] === "") {
            this.logger.error("No owner set");
            process.exit(1);
        }
        let prefix = process.env.NODE_ENV !== "dev" ? process.env.BOT_PREFIX : process.env.BOT_PREFIX_DEV;
        if (prefix === "") {
            this.logger.error("No prefix set");
            process.exit(1);
        }

        /* Database directory */
        const dataDir = "./.data";
        if (!fs.existsSync(dataDir)) {
            this.logger.log(`create '${dataDir}'`);
            fs.mkdirSync(dataDir)
        }
    }

    async init() {
        /* Commands */
        this.commands = {};
        const commands = walkSync('./commands/');
        commands.forEach(async file => {
            if (path.extname(file) === ".js") {
                let className = path.basename(file, path.extname(file));
                let classContent = require(`./${file}`);
                this.logger.log(`Loading Command: ${className}. 👌`);
                this.commands[className] = new classContent(this);
            }
        });
        this.logger.log(`Loading a total of ${commands.length} commands.`, "success");

        /* Events */
        const events = walkSync('./events/');
        events.forEach(async file => {
            if (path.extname(file) === ".js") {
                const eventName = path.basename(file, path.extname(file));
                const event = require(`./${file}`);
                this.logger.log(`Loading Event: ${eventName}. 👌`);
                this.client.on(eventName, event.bind(null, this));
                delete require.cache[require.resolve(`./${file}`)];
            }
        });
        this.logger.log(`Loading a total of ${events.length} events.`, "success");

        /* Crons */
        this.crons = {};

        /* Locks */
        this.locks = {};

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
        const chokidar = require("chokidar");

        let watchOptions = {
            ignored: /(^|[\/\\])\../,
            alwaysStat: false,
            awaitWriteFinish: {stabilityThreshold: 2000, pollInterval: 100}
        };

        chokidar.watch("classes/", watchOptions).on("change", (event) => {
            let filename = path.basename(event);
            let className = filename.split(".").shift();
            let classContent = BOT.reloadClass(className);

            if (["functions", "helpers", "sqlite", "queries"].indexOf(className) !== -1) {
                if (className === "sqlite") this.sql = new classContent(this);
                if (className === "helpers") this.helpers = new classContent(this);
                if (className === "queries") this.queries = new classContent(this);
                if (className === "functions") this.functions = new classContent(this);

                this.logger.log(`chokidar: class ${filename} reloaded !`);
            }
        });

        chokidar.watch("commands/", watchOptions).on("change", (event) => {
            let filename = path.basename(event);
            let className = filename.split(".").shift();
            let classContent = BOT.reloadCommand(className);
            this.commands[className] = new classContent(this);

            this.logger.log(`chokidar: command ${filename} reloaded !`);
        });

        chokidar.watch("crons/", watchOptions).on("change", (event) => {
            let filename = path.basename(event);
            let className = filename.split(".").shift();
            let classContent = BOT.reloadCron(className);
            this.crons[className] = new classContent(this);

            this.logger.log(`chokidar: cron ${filename} reloaded !`);
        });

        chokidar.watch("events/", watchOptions).on("change", (event) => {
            let filename = path.basename(event);
            let eventName = filename.split(".").shift();
            let eventContent = BOT.reloadEvent(eventName);
            if (eventContent !== false) {
                this.logger.log(`chokidar: event ${filename} reloaded !`);
            }
        });

        setInterval(() => {
            let used = process.memoryUsage().heapUsed / 1024 / 1024;
            this.logger.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
        }, 1000 * 60 * 5);
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
            if ((process.env.NODE_ENV !== "dev" && cmd._config.prefix.indexOf(newMessage.prefix) !== -1) || (process.env.NODE_ENV === "dev" && botOwner.indexOf(newMessage.author.id) !== -1)) {
                if (cmd._config.timeout > 0) {
                    newMessage.delete(cmd._config.timeout).catch(reason => {
                        this.logger.error(reason);
                    });
                }
                else if (cmd._config.timeout === -1) {
                    newMessage.delete().catch(reason => {
                        this.logger.error(reason);
                    });
                }
                cmd.run(newMessage, args);
                this.logger.cmd(`[CMD] ${newMessage.author.username} (${newMessage.author.id}) ran command ${cmd._config.name}`);
            }
        }
    }

    static reloadClass(className) {
        const f = "./classes/" + className;

        if (fs.existsSync(f + ".js")) {
            delete require.cache[require.resolve(f)];
            return require(f);
        }

        return false;
    }

    static reloadCommand(commandName) {
        const f = "./commands/" + commandName;

        if (fs.existsSync(f + ".js")) {
            delete require.cache[require.resolve(f)];
            return require(f);
        }

        return false;
    }

    static reloadCron(cronName) {
        const f = "./crons/" + cronName;

        if (fs.existsSync(f + ".js")) {
            delete require.cache[require.resolve(f)];
            return require(f);
        }

        return false;
    }

    static reloadEvent(eventName) {
        const f = "./events/" + eventName;

        if (fs.existsSync(f + ".js")) {
            delete require.cache[require.resolve(f)];
            return require(f);
        }

        return false;
    }
}

module.exports = BOT;

function walkSync(dir, fileList = []) {
    fs.readdirSync(dir).forEach(file => {
        fileList = fs.statSync(path.join(dir, file)).isDirectory()
            ? walkSync(path.join(dir, file), fileList)
            : fileList.concat(path.join(dir, file));
    });
    return fileList;
}