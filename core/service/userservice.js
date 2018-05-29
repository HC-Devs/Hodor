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
const user_1 = require("../model/user");
const userdao_1 = require("../dao/userdao");
const Table = require('markdown-table');
function TestUser(sqlConnector) {
    return __awaiter(this, void 0, void 0, function* () {
        let userdao = new userdao_1.UserDao(sqlConnector);
        let users = yield userdao.getAll();
        let maxId = Math.max.apply(Math, users.map(function (o) { return o.id; }));
        let newId = (parseInt(maxId) + 1).toString();
        let newUser = new user_1.User(newId, "aurelien", "Hades corpo");
        yield userdao.insert(newUser);
        let newUserFromDb = yield userdao.getById(newId);
        newUserFromDb.name = "aurélienK";
        let result = yield userdao.update(newUserFromDb);
        let tabResult = yield ListUser(sqlConnector);
        yield userdao.delete(newUserFromDb);
        return tabResult;
    });
}
exports.TestUser = TestUser;
function ListUser(sqlConnector) {
    return __awaiter(this, void 0, void 0, function* () {
        let userdao = new userdao_1.UserDao(sqlConnector);
        let users = yield userdao.getAll();
        return generateMarkdownTable(users);
    });
}
exports.ListUser = ListUser;
function generateMarkdownTable(data) {
    const header = '```Markdown\n';
    const footer = '\n```';
    let array = [];
    data.forEach(function (d, index) {
        array.push(d.getArray());
    });
    var tab = Table(array);
    return header + tab + footer;
}
//# sourceMappingURL=userservice.js.map