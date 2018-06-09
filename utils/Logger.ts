const chalk = require('chalk');
const moment = require('moment');

export class Logger {

    static log = (content, type = "log") => {
        const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
        switch (type) {
            case "log": {
                return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
            }
            case "warn": {
                return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
            }
            case "error": {
                return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
            }
            case "success": {
                return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content} `);
            }
            case "debug": {
                return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
            }
            case "cmd": {
                return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
            }
            case "ready": {
                return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
            }
            default:
                throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
        }
    };

    static error = (...args) => Logger.log(args, "error");

    static warn = (...args) => Logger.log(args, "warn");

    static debug = (...args) => Logger.log(args, "debug");

    static cmd = (...args) => Logger.log(args, "cmd");
}