const Promise = require("bluebird");
const sqlite = require("sqlite");

const databaseFile = "./.data/database.db";

class SQLITE {
    constructor(bot) {
        this.bot = bot;

        this.init();
    }

    async connect() {
        let dbPromise = sqlite.open(databaseFile, {cached: true, Promise});
        this.db = await dbPromise;

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
