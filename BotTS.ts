import {Client} from "discord.js";
import {Logger} from "./utils/Logger.js";

export class BotTS {
    client: Client;
    logger: Logger;
    commands: any;
    events: any;
    crons: any;
    functions: any;
    helpers: any;
    sql: any;
    queries: any;

    constructor(client: Client) {
        this.client = client;
    }

    async init() {

    }

    async watch() {

    }
}