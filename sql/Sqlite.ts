import {Database} from "sqlite3";

export class Sqlite {
    public database: Database;

    constructor(filename: string, callback?: (err: Error | null) => void) {
        const sql = require('sqlite3').verbose();

        this.database = new sql.Database(filename, callback);
    }

    async close(callback?: (err: Error | null) => void) {
        if (this.database) {
            this.database.close(callback);
        }
    }
}