import {BaseDao} from "./BaseDao";
import {UserWsRole} from "../model/UserWsRole";
import {Sqlite} from "../../sql/Sqlite";

const tableName: string = "user_ws_role";

const fkUserWsIdField: string = "fk_user_ws_id";
const roleNameField: string = "user_ws_role_name";

const idField: string = tableName + "_id"; 

export class ModuleDao extends BaseDao<UserWsRole> {
    constructor(sqlConnector: Sqlite) {
        super(tableName, idField, sqlConnector);
    }

    protected getMapDataFromModel(model: UserWsRole): Map<string, any> {
        let result: Map<string, any> = new Map<string, any>();
        //result.set(this.idFieldName, model.id); // only needed for user; others id are autogenerated
        result.set(fkUserWsIdField, model.userWsId);
        result.set(roleNameField, model.roleName);
        return result;
    }

    protected getModelFromRow(row: any): UserWsRole {
        return new UserWsRole(row[idField], row[fkUserWsIdField], row[roleNameField]);
    }
}