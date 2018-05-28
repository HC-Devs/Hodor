"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PromiseB = require("bluebird");
const sqlite = require("sqlite3").verbose();
const databaseFile = "./sql/hc.sqlite3";
class SQLITE {
    constructor(bot) {
        this.bot = bot;
        this.init();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            //let dbPromise = sqlite.open(databaseFile, { cached: true, PromiseB });
            this.db = new sqlite.Database(databaseFile);
            return this.db;
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            let query;
            console.log("sql : init runs");
            query = "CREATE TABLE IF NOT EXISTS test (test TEXT NOT NULL)";
            yield this.db.run(query);
            return true;
        });
    }
    get(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            let res = yield this.db.get(query, params);
            return (typeof res === "undefined" ? null : res);
        });
    }
    all(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            let res = yield this.db.all(query, params);
            return res;
        });
    }
    run(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            let res = yield this.db.run(query, params);
            return res;
        });
    }
}
exports.SQLITE = SQLITE;
module.exports = SQLITE;
//# sourceMappingURL=sqlite.js.map