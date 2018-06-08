import {Database} from "sqlite3";

export class Sqlite {
    public db: Database;

    constructor(filename: string, callback?: (err: Error | null) => void) {
        const sql = require('sqlite3').verbose();
        this.db = new sql.Database(filename, callback);
        this.init();
    }

    async close(callback?: (err: Error | null) => void) {
        if (this.db) {
            this.db.close(callback);
        }
    }

    init() {
        // TODO create TABLE here?
        //let query = "CREATE TABLE IF NOT EXISTS test (test TEXT NOT NULL)";
        //this.database.run(query);
    }

    /*async get(query, params) {
        let res = await this.db.get(query, params);
        return (typeof res === "undefined" ? null : res);
    }

    async all(query, params) {
        return await this.db.all(query, params);
    }

    async run(query, params) {
        return await this.db.run(query, params);
    }*/
}