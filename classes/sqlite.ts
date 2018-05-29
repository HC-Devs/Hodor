const PromiseB = require("bluebird");
const sqlite = require("sqlite3").verbose();

const databaseFile = "./sql/hc.sqlite3";

export class SQLITE {
    public db: any;
    public bot: any;

    constructor(bot: any) {

        this.bot = bot;

        this.init();
    }

    async connect() {
        //let dbPromise = sqlite.open(databaseFile, { cached: true, PromiseB });
        this.db = new sqlite.Database(databaseFile);

        return this.db;
    }

    async init() {
        await this.connect();

        let query;

        console.log("sql : init runs");
        query = "CREATE TABLE IF NOT EXISTS test (test TEXT NOT NULL)";
        await this.db.run(query);

        return true;
    }

    async get(query, params) {
        await this.connect();

        let res = await this.db.get(query, params);
        return (typeof res === "undefined" ? null : res);
    }

    async all(query, params) {
        await this.connect();

        let res = await this.db.all(query, params);
        return res;
    }

    async run(query, params) {
        await this.connect();

        let res = await this.db.run(query, params);
        return res;
    }
}

module.exports = SQLITE;
