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
class BaseDao {
    constructor(dbTable, idFieldName, sqlConnector) {
        this.dbTable = dbTable;
        this.idFieldName = idFieldName;
        this.sqlConnector = sqlConnector;
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * FROM ${this.dbTable} where ${this.idFieldName} = ?`;
            let row = yield this.sqlConnector.get(query, id);
            let m = this.getModelFromRow(row);
            return m;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * FROM ${this.dbTable}`;
            let models = [];
            let rows = yield this.all(query);
            let r = rows;
            // for(var row in r){
            //     let data = this.getModelFromRow(r[row]);
            //     models.push(data);
            // }
            r.forEach(function (row, index) {
                console.log(row.name);
                let data = this.getModelFromRow(row);
                models.push(data);
            }.bind(this));
            return models;
        });
    }
    // set of rows read
    all(query, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                if (params == undefined) {
                    params = [];
                }
                this.sqlConnector.db.all(query, params, function (err, rows) {
                    if (err) {
                        reject("Read error: " + err.message);
                    }
                    else {
                        resolve(rows);
                    }
                });
            }.bind(this));
        });
    }
}
exports.BaseDao = BaseDao;
//# sourceMappingURL=BaseDao.js.map