import {BaseDao} from "./BaseDao";
import {Module} from "../model/Module";
import {Sqlite} from "../../sql/Sqlite";

const tableName: string = "module";
const nameField: string = "module_name";
const typeField: string = "module_type";
const idField: string = "module_id";

export class ModuleDao extends BaseDao<Module> {
    constructor(sqlConnector: Sqlite) {
        super(tableName, idField, sqlConnector);
    }

    protected getMapDataFromModel(model: Module): Map<string, any> {
        let result: Map<string, any> = new Map<string, any>();
        result.set(this.idFieldName, model.id); // only needed for user; others id are autogenerated
        result.set(nameField, model.name);
        result.set(typeField, model.type);
        return result;
    }



    public async getModuleByName(moduleName: string): Promise<Module> {
        let query = `SELECT * FROM ${this.dbTable} where ${nameField} = ?`;
        let row = await this.get(query, [moduleName]);
        let m = this.getModelFromRow(row);

        return m;
    }

    protected getModelFromRow(row: any): Module {
        return new Module(row[idField], row[nameField], row[typeField]);
    }
}