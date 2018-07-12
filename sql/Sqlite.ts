import {Database} from "sqlite3";

export class Sqlite {
    public database: Database;

    constructor(filename: string, callback?: (err: Error | null) => void) {
        const sql = require('sqlite3').verbose();

        this.database = new sql.Database(filename, callback);
    }

    async init() {
        if (this.database) {

        }
    }

    async close(callback?: (err: Error | null) => void) {
        if (this.database) {
            this.database.close(callback);
        }
    }

    async drop() {
        if (this.database) {
            this.database.serialize(() => {
                this.database.each("select name from sqlite_master where type='table'", (err, table) => {
                    this.database.run(`DROP TABLE ${table.name};`, error => {
                        console.log(table);
                    });
                })
            })
        }
    }
}