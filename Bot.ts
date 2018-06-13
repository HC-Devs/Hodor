import * as chokidar from "chokidar";
import { Client, Message } from "discord.js";
import { BaseCommand } from "./commands/BaseCommand";
import { Global } from "./utils/Global";
import * as fs from "fs";
import * as path from "path";
import { Sqlite } from "./classes/Sqlite";
import { Logger } from "./utils/Logger";
import { FunctionnalError } from "./exceptions/FonctionnalError";
import { Citation, Insulte } from "./commands/divers/CitationCommand";

/* Rights */
const allowedBots = [];
const allowedGuilds = [
    "413390615158718464",
    "420194593167114250"  // Test
];

export class Bot {
    client: Client;
    commands: Map<string, BaseCommand> = new Map<string, BaseCommand>();
    aliases: Map<string, BaseCommand> = new Map<string, BaseCommand>();
    crons: Array<any> = Array<any>();
    locks: Array<any> = Array<any>();
    functions: Array<any> = Array<any>();
    helpers: Array<any> = Array<any>();
    sql: Sqlite;

    watchOptions = {
        recursive: true,
        ignored: /(^|[\/\\])\../,
        alwaysStat: false,
        awaitWriteFinish: { stabilityThreshold: 2000, pollInterval: 100 }
    };

    constructor(client: Client) {
        this.client = client;

        // BotOLD owner
        if (Global.botOwner.length === 0 || Global.botOwner.length[0] === "") {
            Logger.error("No owner set");
            process.exit(1);
        }

        // Prefix
        let prefix = Global.nodeEnv !== "dev" ? Global.prefix : Global.prefixDev;
        if (prefix === "") {
            Logger.error("No prefix set");
            process.exit(1);
        }

        // Database directory
        if (!fs.existsSync(Global.dataBaseDir)) {
            Logger.log(`create '${Global.dataBaseDir}'`);
            fs.mkdirSync(Global.dataBaseDir);
        }

        // Database creation
        this.sql = new Sqlite(`${Global.dataBaseDir}/${Global.dataBaseName}`, err => {
            if (err) Logger.error(err);
            else Logger.log(`Connected the the '${Global.dataBaseName}' database.`);
        });
    }

    async init() {
        // Commands
        const commands = walkSync(Global.pathCommandsDirectory);
        for (let i = 0; i < commands.length; i++) {
            let file = commands[i];
            if (isValidFileName(file)) {
                let className = path.basename(file, path.extname(file));
                await import(`./${path.dirname(file)}/${className}`).then(Command => {
                    let command = new Command(this);
                    if (command.config) {
                        if (this.commands.has(command.config.name))
                            throw new Error("Une commande avec le meme nom existe déjà: " + command.config.name);
                        this.commands.set(command.config.name, command);
                        if (command.config.aliases) {
                            command.config.aliases.forEach(alias => {
                                if (this.aliases.has(alias))
                                    throw new Error("Une commande avec le meme alias existe déjà: " + alias);
                                this.aliases.set(alias, command);
                            });
                        }
                        Logger.log(`Loading Command: ${command.config.name}. 👌`);
                    }
                }).catch(reason => {
                    //Logger.error(reason);
                });
            }
        }
        Logger.log(`Loading a total of ${this.commands.size} commands.`, "success");

        // Events
        const events = walkSync(Global.pathEventsDirectory);
        events.forEach(file => {
            if (path.extname(file) === ".js") {
                const eventName = path.basename(file, path.extname(file));
                const event = require(`./${file}`);
                Logger.log(`Loading Event: ${eventName}. 👌`);
                this.client.on(eventName, event.bind(null, this));
                delete require.cache[require.resolve(`./${file}`)];
            }
        });
        Logger.log(`Loading a total of ${events.length} events.`, "success");
    }

    async watch() {
        /*let watchOptions = {
            recursive: true,
            ignored: /(^|[\/\\])\../,
            alwaysStat: false,
            awaitWriteFinish: {stabilityThreshold: 2000, pollInterval: 100}
        };*/
        chokidar.watch(Global.pathClassesDirectory, this.watchOptions).on("change", event => {
            // TODO
            /*let className = path.basename(event, path.extname(event));
            if (reloadFile(event)) {
                Logger.log(`chokidar: class ${className} reloaded !`);
            }*/
        });
        chokidar.watch(Global.pathCommandsDirectory, this.watchOptions).on("change", event => {
            let className = path.basename(event, path.extname(event));
            if (reloadFile(event)) {
                Logger.log(`chokidar: class ${className} reloaded !`);
            }
        });
        chokidar.watch(Global.pathEventsDirectory, this.watchOptions).on("change", event => {
            // TODO
        });
        chokidar.watch(Global.pathCronsDirectory, this.watchOptions).on("change", event => {
            // TODO
        });

        setInterval(() => {
            let used = process.memoryUsage().heapUsed / 1024 / 1024;
            Logger.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
        }, 1000 * 60 * 5);
    }

    async parseMessage(oldMessage: Message, newMessage: Message) {
        try {
            // dm message not allowed
            if (newMessage.channel.type === "dm") return;

            // message from bot, is bot allowed ?
            if (newMessage.author.bot && allowedBots.indexOf(newMessage.author.id) === -1) return;

            // guild allowed
            if (allowedGuilds.indexOf(newMessage.guild.id) === -1) {
                Logger.error("Bot is not allowed in " + newMessage.guild.name + " (" + newMessage.guild.id + ")");
                return;
            }

            // Display help ?
            if (newMessage.content.indexOf(Global.helpPrefix) === 0) {
                // retrieve command 
                const command = newMessage.content.slice(Global.helpPrefix.length).trim().split(/ +/g).shift().toLowerCase();
                const cmd = this.commands.get(command) || this.aliases.get(command);
                if (cmd) {
                    cmd.assertIsGranted(newMessage);
                    newMessage.reply(cmd.getHelpMsg()).then((msg: Message) => msg.delete(cmd.config.timeout));
                }
                newMessage.delete();
                return;
            }

            // Display citation ?
            if (newMessage.content.indexOf("'") === 0) {
                // retrieve command 
                const command = newMessage.content.slice(1).trim().split(/ +/g).shift().toLowerCase();

                const cit = await Citation(command);
                newMessage.reply(cit);

                newMessage.delete();
                return;
            }

            // Display insulte ?
            if (newMessage.content === "$*ù") {

                const cit = await Insulte();
                newMessage.reply(cit);

                newMessage.delete();
                return;
            }

            // check prefix
            let prefix = Global.nodeEnv !== "dev" ? Global.prefix : Global.prefixDev;
            if (newMessage.content.indexOf(prefix) !== 0) return;

            // retrieve command & args
            const args = newMessage.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();

            const cmd = this.commands.get(command) || this.aliases.get(command);
            if (cmd) {
                if ((Global.nodeEnv !== "dev" && cmd.config.prefix.indexOf(prefix) !== -1) || (Global.nodeEnv === "dev" && Global.botOwner.indexOf(newMessage.author.id) !== -1)) {
                    if (cmd.config.timeout > 0) {
                        newMessage.delete(cmd.config.timeout).catch(reason => {
                            Logger.error(reason);
                        });
                    }
                    else if (cmd.config.timeout === -1) {
                        newMessage.delete().catch(reason => {
                            Logger.error(reason);
                        });
                    }


                    cmd.assertIsGranted(newMessage);
                    cmd.assertSyntax(newMessage, args);

                    cmd.run(newMessage, args).then(() => {
                        Logger.cmd(`[CMD] ${newMessage.author.username} (${newMessage.author.id}) ran command ${cmd.config.name}`);
                    }).catch(reason => {
                        if (reason instanceof FunctionnalError) {
                            newMessage.reply(reason.message).then((msg: Message) => msg.delete(cmd.config.timeout));
                        }
                        Logger.error(reason);
                    });

                }
            }
        } catch (err) {
            if (err instanceof FunctionnalError) {
                newMessage.reply(err.message).then((msg: Message) => msg.delete(Global.timeout));
            } else {
                newMessage.reply("Erreur inconnue rencontrée : " + err.msg).then((msg: Message) => msg.delete(Global.timeout));
            }
        }
        newMessage.delete(Global.timeout);
    }
}

function walkSync(dir: string, fileList: string[] = []) {
    fs.readdirSync(dir).forEach(file => {
        fileList = fs.statSync(path.join(dir, file)).isDirectory()
            ? walkSync(path.join(dir, file), fileList)
            : fileList.concat(path.join(dir, file));
    });
    return fileList;
}

function isValidFileName(file: string): boolean {
    return file.split('.').length === 2 && path.extname(file) === ".ts";
}

function reloadFile(file: string): boolean {
    if (isValidFileName(file) && fs.existsSync(`./${file}`)) {
        let className = `./${path.dirname(file)}/${path.basename(file, path.extname(file))}`;
        delete require.cache[require.resolve(className)];
        return require(className);
    }
    return false;
}