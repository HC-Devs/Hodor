import * as logger from "./utils/Logger.js";
import * as chokidar from "chokidar";
import {Client, Message} from "discord.js";
import {Command} from "./commands/Command";
import {Config} from "./Config";
import * as fs from "fs";
import * as path from "path";

/* Rights */
const allowedBots = [];
const allowedGuilds = [
    "413390615158718464",
    "420194593167114250"  // Test
];

export class BotTS {
    client: Client;
    commands: Map<string, Command> = new Map<string, Command>();
    crons: Array<any> = Array<any>();
    locks: Array<any> = Array<any>();
    functions: Array<any> = Array<any>();
    helpers: Array<any> = Array<any>();
    sql: any;
    queries: any;

    watchOptions = {
        recursive: true,
        ignored: /(^|[\/\\])\../,
        alwaysStat: false,
        awaitWriteFinish: {stabilityThreshold: 2000, pollInterval: 100}
    };

    constructor(client: Client) {
        this.client = client;

        // Bot owner
        if (Config.botOwner.length === 0 || Config.botOwner.length[0] === "") {
            logger.error("No owner set");
            process.exit(1);
        }

        // Prefix
        let prefix = Config.nodeEnv !== "dev" ? Config.prefix : Config.prefixDev;
        if (prefix === "") {
            logger.error("No prefix set");
            process.exit(1);
        }

        // Database directory
        if (!fs.existsSync(Config.dataBaseDir)) {
            logger.log(`create '${Config.dataBaseDir}'`);
            fs.mkdirSync(Config.dataBaseDir);
        }
    }

    async init() {
        // Commands
        const commands = walkSync(Config.pathCommandsDirectory);
        commands.forEach(file => {
            if (path.extname(file) === ".ts") {
                let className = path.basename(file, path.extname(file));
                try {
                    let req = require(`./${path.dirname(file)}/${path.basename(file, path.extname(file))}`);
                    if (req !== null) {
                        this.commands.set(className, new req(this));
                        logger.log(`Loading Command: ${className}. 👌`);
                    }
                } catch (e) {
                }
            }
        });
        logger.log(`Loading a total of ${this.commands.size} commands.`, "success");

        // Events
        const events = walkSync(Config.pathEventsDirectory);
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
    }

    async watch() {
        /*let watchOptions = {
            recursive: true,
            ignored: /(^|[\/\\])\../,
            alwaysStat: false,
            awaitWriteFinish: {stabilityThreshold: 2000, pollInterval: 100}
        };*/
        chokidar.watch(Config.pathClassesDirectory, this.watchOptions).on("change", event => {
            // TODO
        });
        chokidar.watch(Config.pathCommandsDirectory, this.watchOptions).on("change", event => {
            // TODO
        });
        chokidar.watch(Config.pathEventsDirectory, this.watchOptions).on("change", event => {
            // TODO
        });
        chokidar.watch(Config.pathCronssDirectory, this.watchOptions).on("change", event => {
            // TODO
        });

        setInterval(() => {
            let used = process.memoryUsage().heapUsed / 1024 / 1024;
            logger.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
        }, 1000 * 60 * 5);
    }

    async parseMessage(oldMessage: Message, newMessage: Message) {
        // dm message not allowed
        if (newMessage.channel.type === "dm") return;

        // message from bot, is bot allowed ?
        if (newMessage.author.bot && allowedBots.indexOf(newMessage.author.id) === -1) return;

        // guild allowed
        if (allowedGuilds.indexOf(newMessage.guild.id) === -1) {
            logger.error("Bot is not allowed in " + newMessage.guild.name + " (" + newMessage.guild.id + ")");
            return;
        }

        // check prefix
        let prefix = process.env.NODE_ENV !== "dev" ? process.env.BOT_PREFIX : process.env.BOT_PREFIX_DEV;
        if (newMessage.content.indexOf(prefix) !== 0) return;
        //newMessage.prefix = prefix;

        // retrieve command & args
        const args = newMessage.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (typeof this.commands.get(command) !== "undefined") {
            let cmd = this.commands.get(command);
            if ((process.env.NODE_ENV !== "dev" && cmd.config.prefix.indexOf(prefix) !== -1) || (process.env.NODE_ENV === "dev" && Config.botOwner.indexOf(newMessage.author.id) !== -1)) {
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
    }
}

function walkSync(dir, fileList = []) {
    fs.readdirSync(dir).forEach(file => {
        fileList = fs.statSync(path.join(dir, file)).isDirectory()
            ? walkSync(path.join(dir, file), fileList)
            : fileList.concat(path.join(dir, file));
    });
    return fileList;
}