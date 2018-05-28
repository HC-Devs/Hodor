import {SQLITE} from '../../classes/sqlite';
import {BaseModel} from '../model/basemodel';

export abstract class BaseDao<T extends BaseModel> {

    constructor(protected dbTable: string, protected idFieldName, protected sqlConnector: SQLITE) { }

    protected abstract getModelFromRow(row: any): T;
  
    public async getById(id: number): Promise<T> {
        let query = `SELECT * FROM ${this.dbTable} where ${this.idFieldName} = ?`;
        let row = await this.sqlConnector.get(query, id);
        let m = this.getModelFromRow(row);
     
        return m;
    }
  
    public async getAll(): Promise<Array<T>> {
        let query = `SELECT * FROM ${this.dbTable}`;
        let models : Array<T> = [];
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

        // set of rows read
        private async all(query, params = [])
        {
          return new Promise(function(resolve, reject) {
              if(params == undefined) {
                  params=[];
                }
          
                this.sqlConnector.db.all(query, params, function(err, rows)  {
                    if(err) {
                      reject("Read error: " + err.message);
                    }
                    else {
                        resolve(rows);
                    }
                });
        }.bind(this)); 
      
        }

} 