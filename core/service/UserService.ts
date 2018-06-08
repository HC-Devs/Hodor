﻿import { User } from '../model/User';
import { UserDao } from '../dao/UserDao';
import { SQLITE } from '../../classes/sqlite';
import { Module } from '../model/Module';
import { UserModule } from '../model/UserModule';
import { UserModuleDao } from '../dao/UserModuleDao';
import { ModuleDao } from '../dao/ModuleDao';

const Table = require('markdown-table');


export async function AddModuleToUser(sqlConnector: SQLITE, userId: string, moduleName: string, level: number): Promise<boolean> {
    // 1. Get module id from db from name
    let moduleDao = new ModuleDao(sqlConnector);
    let mod = await moduleDao.getModuleByName(moduleName);


    // 2. Check if new module or update of existing ong
    let userModuleDao = new UserModuleDao(sqlConnector);
    let existingModule = (await userModuleDao.getAll()).find(m => m.moduleId === Number(mod.id) && m.userId === userId); //Todo specific db query?
    if (existingModule) {
        // 3.a update existing one
        existingModule.level = level;
        return userModuleDao.update(existingModule);
    } else {
        // 3.b insert new one
        let userModule = new UserModule(-1, userId, Number(mod.id), level);
        let newRowId = userModuleDao.insert(userModule);
        if (newRowId)
            return true;
        else
            return false;
    }
}

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