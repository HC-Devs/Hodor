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
const userdao_1 = require("../dao/userdao");
const Table = require('markdown-table');
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