import {SQLITE} from '../../classes/sqlite';
import {BaseModel} from '../model/BaseModel';

/*
*  Generic abstract class 
*  Give base methods to manipulate data from database
*  All dao must override this class
*/
export abstract class BaseDao<T extends BaseModel> {

    protected constructor(protected dbTable: string, protected idFieldName, protected sqlConnector: SQLITE) {
    }

    /*
    *  Get strongly typed date model object from database row
    */
    protected abstract getModelFromRow(row: any): T;

    /*
    *  Get map of field-value from model
    */
    protected abstract getMapDataFromModel(model: T): Map<string, any>;

    /*
    *  Get unique element from DB with unique identifier
    */
    public async getById(id: string): Promise<T> {
        let query = `SELECT * FROM ${this.dbTable} where ${this.idFieldName} = ?`;
        let row = await this.get(query, [id]);
        let m = this.getModelFromRow(row);

        return m;
    }

 

    /*
    *  Get all elements from DB 
    */
    public async getAll(): Promise<Array<T>> {
        let query = `SELECT * FROM ${this.dbTable}`;
        let models: Array<T> = [];
        let rows = await this.all(query);
        let r = rows as any[];
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
    }

    /*
  *  Create an element into DB
  *  Return id of created element
  */
    public async insert(model: T): Promise<string> {
        let mapDataField = this.getMapDataFromModel(model);
        let fieldsDef = Array.from(mapDataField.keys()).join(',');

        let values = Array(mapDataField.size).fill('?');
        let valuesParam = Array.from(mapDataField.values());

        let query = `INSERT INTO ${this.dbTable} (${fieldsDef})  VALUES (${values})`;
        let result = await this.run(query, valuesParam);
        console.log(`Row(s) updated: ${result.changes}`);
        return result.lastID;
    }

    /*
    *  Update an element from DB 
    *  Return true if one element is really updated 
    */
    public async update(model: T): Promise<boolean> {
        let mapDataField = this.getMapDataFromModel(model);
        let setStatement: string[] = [];
        let params: any[] = [];

        mapDataField.forEach((value, key) => {
            setStatement.push(`${key} = ?`);
            params.push(value);
        });
        let setDefinition = setStatement.join(',');
        params.push(model.id);

        let query = `UPDATE ${this.dbTable} SET ${setDefinition} WHERE ${this.idFieldName} = ?`;
        let result = await this.run(query, params);
        console.log(`Row(s) updated: ${result.changes}`);
        return result.changes === 1;
    }

    /*
    *  Delete an element from DB 
    *  Return true if one element is really deleted
    */
    public async delete(model: T): Promise<boolean> {
        return await this.deleteFromId(model.id);
    }

    /*
    *  Delete an element from DB 
    *  Return true if one element is really deleted
    */
    public async deleteFromId(id: string): Promise<boolean> {
        let query = `DELETE FROM ${this.dbTable} WHERE ${this.idFieldName} = ?`;
        let result = await this.run(query, [id]);
        console.log(`Row(s) deleted: ${result.changes}`);
        return result.changes === 1;
    }

    /*
    *  Wrapper arround sqlite [all] to fetch all result from query 
    */
    protected async all(query, params = []) {
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
    private async run(query, params = []): Promise<any> {
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
    }

    /*
    *  Wrapper arround sqlite [get] to get one result from query 
    */
    protected async get(query, params): Promise<any> {
        return new Promise(function (resolve, reject) {
            console.log(`Get query: ${query} \n with params: ${params.join(',')}`);
            this.sqlConnector.db.get(query, params, function (err, row) {
                if (err) reject("Read error: " + err.message)
                else {
                    resolve(row)
                }
            })
        }.bind(this));
    }

}