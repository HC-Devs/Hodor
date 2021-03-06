import {BaseDao} from "./BaseDao";
import {Ship} from "../model/Ship";
import {Sqlite} from "../../sql/Sqlite";

const tableName: string = "ship";
const nameField: string = "ship_name";
const typeField: string = "ship_type";
const fkUserIdField: string = "fk_user_id";
const idField: string = "ship_id";

export class ModuleDao extends BaseDao<Ship> {
    constructor(sqlConnector: Sqlite) {
        super(tableName, idField, sqlConnector);
    }

    protected getMapDataFromModel(model: Ship): Map<string, any> {
        let result: Map<string, any> = new Map<string, any>();
        //result.set(this.idFieldName, model.id); // only needed for user; others id are autogenerated
        result.set(nameField, model.name);
        result.set(typeField, model.type);
        return result;
    }

    protected getModelFromRow(row: any): Ship {
        return new Ship(row[idField], row[nameField], row[typeField], row[fkUserIdField]);
    }
}