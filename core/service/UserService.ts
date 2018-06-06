import {User} from '../model/User';
import {UserDao} from '../dao/UserDao';
import {SQLITE} from '../../classes/sqlite';

const Table = require('markdown-table');

export async function TestUser(sqlConnector: SQLITE): Promise<string> {
    let userdao = new UserDao(sqlConnector);
    let users = await userdao.getAll();
    let maxId = Math.max.apply(Math, users.map(function (o) {
        return o.id;
    }));
    let newId = (parseInt(maxId) + 1).toString();
    let newUser = new User(newId, "aurelien", "Hades corpo");

    await userdao.insert(newUser);

    let newUserFromDb = await userdao.getById(newId);

    newUserFromDb.name = "aurélienK";
    let result = await userdao.update(newUserFromDb);

    let tabResult = await ListUser(sqlConnector);

    await userdao.delete(newUserFromDb);

    return tabResult;
}

export async function ListUser(sqlConnector: SQLITE): Promise<string> {
    let userdao = new UserDao(sqlConnector);
    let users = await userdao.getAll();
    return generateMarkdownTable(users);
}

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