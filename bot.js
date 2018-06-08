"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require("./utils/Logger.js");
const chokidar = require("chokidar");
const Config_1 = require("./Config");
const fs = require("fs");
const path = require("path");
const Sqlite_1 = require("./classes/Sqlite");
/* Rights */
const allowedBots = [];
const allowedGuilds = [
    "413390615158718464",
    "420194593167114250" // Test
];
class Bot {
    constructor(client) {
        this.commands = new Map();
        this.crons = Array();
        this.locks = Array();
        this.functions = Array();
        this.helpers = Array();
        this.watchOptions = {
            recursive: true,
            ignored: /(^|[\/\\])\../,
            alwaysStat: false,
            awaitWriteFinish: { stabilityThreshold: 2000, pollInterval: 100 }
        };
        this.client = client;
        // BotOLD owner
        if (Config_1.Config.botOwner.length === 0 || Config_1.Config.botOwner.length[0] === "") {
            logger.error("No owner set");
            process.exit(1);
        }
        // Prefix
        let prefix = Config_1.Config.nodeEnv !== "dev" ? Config_1.Config.prefix : Config_1.Config.prefixDev;
        if (prefix === "") {
            logger.error("No prefix set");
            process.exit(1);
        }
        // Database directory
        if (!fs.existsSync(Config_1.Config.dataBaseDir)) {
            logger.log(`create '${Config_1.Config.dataBaseDir}'`);
            fs.mkdirSync(Config_1.Config.dataBaseDir);
        }
        // Database creation
        this.sql = new Sqlite_1.Sqlite(`${Config_1.Config.dataBaseDir}/${Config_1.Config.dataBaseName}`, err => {
            if (err)
                logger.error(err);
            else
                logger.log(`Connected the the '${Config_1.Config.dataBaseName}' database.`);
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // Commands
            const commands = walkSync(Config_1.Config.pathCommandsDirectory);
            for (let i = 0; i < commands.length; i++) {
                let file = commands[i];
                if (isValidFileName(file)) {
                    let className = path.basename(file, path.extname(file));
                    yield Promise.resolve().then(() => require(`./${path.dirname(file)}/${className}`)).then(Command => {
                        let command = new Command(this);
                        if (command.config) {
                            this.commands.set(command.config.name, command);
                            logger.log(`Loading Command: ${command.config.name}. 👌`);
                        }
                    }).catch(reason => {
                        //logger.error(reason);
                    });
                }
            }
            logger.log(`Loading a total of ${this.commands.size} commands.`, "success");
            // Events
            const events = walkSync(Config_1.Config.pathEventsDirectory);
            events.forEach(file => {
                if (path.extname(file) === ".js") {
                    const eventName = path.basename(file, path.extname(file));
                    const event = require(`./${file}`);
                    logger.log(`Loading Event: ${eventName}. 👌`);
                    this.client.on(eventName, event.bind(null, this));
                    delete require.cache[require.resolve(`./${file}`)];
                }
            });
            logger.log(`Loading a total of ${events.length} events.`, "success");
        });
    }
    watch() {
        return __awaiter(this, void 0, void 0, function* () {
            /*let watchOptions = {
                recursive: true,
                ignored: /(^|[\/\\])\../,
                alwaysStat: false,
                awaitWriteFinish: {stabilityThreshold: 2000, pollInterval: 100}
            };*/
            chokidar.watch(Config_1.Config.pathClassesDirectory, this.watchOptions).on("change", event => {
                // TODO
                /*let className = path.basename(event, path.extname(event));
                if (reloadFile(event)) {
                    logger.log(`chokidar: class ${className} reloaded !`);
                }*/
            });
            chokidar.watch(Config_1.Config.pathCommandsDirectory, this.watchOptions).on("change", event => {
                let className = path.basename(event, path.extname(event));
                if (reloadFile(event)) {
                    logger.log(`chokidar: class ${className} reloaded !`);
                }
            });
            chokidar.watch(Config_1.Config.pathEventsDirectory, this.watchOptions).on("change", event => {
                // TODO
            });
            chokidar.watch(Config_1.Config.pathCronsDirectory, this.watchOptions).on("change", event => {
                // TODO
            });
            setInterval(() => {
                let used = process.memoryUsage().heapUsed / 1024 / 1024;
                logger.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
            }, 1000 * 60 * 5);
        });
    }
    parseMessage(oldMessage, newMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            // dm message not allowed
            if (newMessage.channel.type === "dm")
                return;
            // message from bot, is bot allowed ?
            if (newMessage.author.bot && allowedBots.indexOf(newMessage.author.id) === -1)
                return;
            // guild allowed
            if (allowedGuilds.indexOf(newMessage.guild.id) === -1) {
                logger.error("BotOLD is not allowed in " + newMessage.guild.name + " (" + newMessage.guild.id + ")");
                return;
            }
            // check prefix
            let prefix = process.env.NODE_ENV !== "dev" ? process.env.BOT_PREFIX : process.env.BOT_PREFIX_DEV;
            if (newMessage.content.indexOf(prefix) !== 0)
                return;
            // retrieve command & args
            const args = newMessage.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            if (typeof this.commands.get(command) !== "undefined") {
                let cmd = this.commands.get(command);
                if ((process.env.NODE_ENV !== "dev" && cmd.config.prefix.indexOf(prefix) !== -1) || (process.env.NODE_ENV === "dev" && Config_1.Config.botOwner.indexOf(newMessage.author.id) !== -1)) {
                    if (cmd.config.timeout > 0) {
                        newMessage.delete(cmd.config.timeout).catch(reason => {
                            logger.error(reason);
                        });
                    }
                    else if (cmd.config.timeout === -1) {
                        newMessage.delete().catch(reason => {
                            logger.error(reason);
                        });
                    }
                    cmd.run(newMessage, args).then(() => {
                        logger.cmd(`[CMD] ${newMessage.author.username} (${newMessage.author.id}) ran command ${cmd.config.name}`);
                    }).catch(reason => {
                        logger.error(reason);
                    });
                }
            }
        });
    }
}
exports.Bot = Bot;
function walkSync(dir, fileList = []) {
    fs.readdirSync(dir).forEach(file => {
        fileList = fs.statSync(path.join(dir, file)).isDirectory()
            ? walkSync(path.join(dir, file), fileList)
            : fileList.concat(path.join(dir, file));
    });
    return fileList;
}
function isValidFileName(file) {
    return file.split('.').length === 2 && path.extname(file) === ".ts";
}
function reloadFile(file) {
    if (isValidFileName(file) && fs.existsSync(`./${file}`)) {
        let className = `./${path.dirname(file)}/${path.basename(file, path.extname(file))}`;
        delete require.cache[require.resolve(className)];
        return require(className);
    }
    return false;
}
//# sourceMappingURL=Bot.js.map