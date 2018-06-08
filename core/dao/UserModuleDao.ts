import {BaseDao} from "./BaseDao";
import {UserModule} from "../model/UserModule";
import {SQLITE} from "../../classes/sqlite";

const tableName: string = "user_module";
const fkUserIdField: string = "fk_user_id";
const fkModuleIdField: string = "fk_module_id";
const levelField: string = "user_module_level";
const idField: string = tableName + "_id"; 

export class UserModuleDao extends BaseDao<UserModule> {
    constructor(sqlConnector: SQLITE) {
        super(tableName, idField, sqlConnector);
    }

    protected getMapDataFromModel(model: UserModule): Map<string, any> {
        let result: Map<string, any> = new Map<string, any>();
        //result.set(this.idFieldName, model.id); // only needed for user; others id are autogenerated
        result.set(fkModuleIdField, model.moduleId);
        result.set(fkUserIdField, model.userId);
        result.set(levelField, model.level);
        return result;
    }

    protected getModelFromRow(row: any): UserModule {
        return new UserModule(row[idField], row[fkModuleIdField], row[fkUserIdField], row[levelField]);
    }
}