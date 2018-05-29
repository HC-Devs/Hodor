import {User} from '../model/user';

import {UserDao} from '../dao/userdao';

import {SQLITE} from '../../classes/sqlite';

const Table = require('markdown-table');

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