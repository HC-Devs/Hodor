"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const BaseDao_1 = require("../dao/BaseDao");
const userDbTable = 'user';
const userNameField = 'user_name';
const userCorpoField = 'user_corpo';
const userIdField = 'user_id';
class UserDao extends BaseDao_1.BaseDao {
    constructor(sqlConnector) {
        super(userDbTable, userIdField, sqlConnector);
    }
    getModelFromRow(row) {
        return new user_1.User(row[userIdField], row[userNameField], row[userCorpoField]);
    }
}
exports.UserDao = UserDao;
//# sourceMappingURL=userdao.js.map