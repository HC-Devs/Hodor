import {Database} from "sqlite3";

export class Sqlite {
    database: Database;

    constructor(filename: string, callback?: (err: Error | null) => void) {
        const sql = require('sqlite3').verbose();
        this.database = new sql.Database(filename, callback);
        this.init();
    }

    async close(callback?: (err: Error | null) => void) {
        if (this.database) {
            this.database.close(callback);
        }
    }

    init() {
        // TODO create TABLE here?
        //let query = "CREATE TABLE IF NOT EXISTS test (test TEXT NOT NULL)";
        //this.database.run(query);
    }

    async get(query, params) {
        let res = await this.database.get(query, params);
        return (typeof res === "undefined" ? null : res);
    }

    async all(query, params) {
        return await this.database.all(query, params);
    }

    async run(query, params) {
        return await this.database.run(query, params);
    }
}