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
/*
*  Generic abstract class
*  Give base methods to manipulate data from database
*  All dao must override this class
*/
class BaseDao {
    constructor(dbTable, idFieldName, sqlConnector) {
        this.dbTable = dbTable;
        this.idFieldName = idFieldName;
        this.sqlConnector = sqlConnector;
    }
    /*
    *  Get unique element from DB with unique identifier
    */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * FROM ${this.dbTable} where ${this.idFieldName} = ?`;
            let row = yield this.get(query, [id]);
            let m = this.getModelFromRow(row);
            return m;
        });
    }
    /*
    *  Get all elements from DB
    */
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
    /*
  *  Create an element into DB
  *  Return id of created element
  */
    insert(model) {
        return __awaiter(this, void 0, void 0, function* () {
            let mapDataField = this.getMapDataFromModel(model);
            let fieldsDef = Array.from(mapDataField.keys()).join(',');
            let values = Array(mapDataField.size).fill('?');
            let valuesParam = Array.from(mapDataField.values());
            let query = `INSERT INTO ${this.dbTable} (${fieldsDef})  VALUES (${values})`;
            let result = yield this.run(query, valuesParam);
            console.log(`Row(s) updated: ${result.changes}`);
            return result.lastID;
        });
    }
    /*
    *  Update an element from DB
    *  Return true if one element is really updated
    */
    update(model) {
        return __awaiter(this, void 0, void 0, function* () {
            let mapDataField = this.getMapDataFromModel(model);
            let setStatement = [];
            let params = [];
            mapDataField.forEach((value, key) => {
                setStatement.push(`${key} = ?`);
                params.push(value);
            });
            let setDefinition = setStatement.join(',');
            params.push(model.id);
            let query = `UPDATE ${this.dbTable} SET ${setDefinition} WHERE ${this.idFieldName} = ?`;
            let result = yield this.run(query, params);
            console.log(`Row(s) updated: ${result.changes}`);
            return result.changes === 1;
        });
    }
    /*
    *  Delete an element from DB
    *  Return true if one element is really deleted
    */
    delete(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.deleteFromId(model.id);
        });
    }
    /*
    *  Delete an element from DB
    *  Return true if one element is really deleted
    */
    deleteFromId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `DELETE FROM ${this.dbTable} WHERE ${this.idFieldName} = ?`;
            let result = yield this.run(query, [id]);
            console.log(`Row(s) deleted: ${result.changes}`);
            return result.changes === 1;
        });
    }
    /*
    *  Wrapper arround sqlite [all] to fetch all result from query
    */
    all(query, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                if (params == undefined) {
                    params = [];
                }
                console.log(`All query: ${query} \n with params: ${params.join(',')}`);
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
    /*
    * Wrapper arround sqlite [run] to run query
    * If execution was successful, the this object will contain two properties named
    *  - lastID : which contain the value of the last inserted row ID
    *  - changes : the number of rows affected by this query
    * Note that :
    *   - lastID only contains valid information when the query was a successfully completed INSERT statement.
    *   - changes only contains valid information when the query was a successfully completed UPDATE or DELETE statement.
    */
    run(query, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                if (params == undefined) {
                    params = [];
                }
                console.log(`Run query: ${query} \n with params: ${params.join(',')}`);
                this.sqlConnector.db.run(query, params, function (err) {
                    if (err) {
                        reject("Run error: " + err.message);
                    }
                    else {
                        resolve(this);
                    }
                });
            }.bind(this));
        });
    }
    /*
    *  Wrapper arround sqlite [get] to get one result from query
    */
    get(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                console.log(`Get query: ${query} \n with params: ${params.join(',')}`);
                this.sqlConnector.db.get(query, params, function (err, row) {
                    if (err)
                        reject("Read error: " + err.message);
                    else {
                        resolve(row);
                    }
                });
            }.bind(this));
        });
    }
}
exports.BaseDao = BaseDao;
//# sourceMappingURL=BaseDao.js.map