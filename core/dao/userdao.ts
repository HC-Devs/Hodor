import {User} from '../model/user';
import {SQLITE} from '../../classes/sqlite';
import {BaseDao} from '../dao/BaseDao';

const userDbTable: string = 'user';
const userNameField: string = 'user_name';
const userCorpoField: string = 'user_corpo';
const userIdField: string = 'user_id';

export class UserDao extends BaseDao<User> {
    constructor(sqlConnector: SQLITE) {
        super(userDbTable, userIdField, sqlConnector);
    }

    protected getModelFromRow(row: any): User {
        return new User(row[userIdField], row[userNameField], row[userCorpoField]);
    }

}