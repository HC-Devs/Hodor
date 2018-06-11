import { User } from '../model/User';
import { UserDao } from '../dao/UserDao';
import { Sqlite } from '../../classes/Sqlite';
import { UserModule } from '../model/UserModule';
import { UserModuleDao } from '../dao/UserModuleDao';
import { ModuleDao } from '../dao/ModuleDao';
import { UserModuleViewModel } from '../viewModel/UserModuleViewModel';

const Table = require('markdown-table');



export async function AddModuleToUser(sqlConnector: Sqlite, userId: string, moduleName: string, level: number): Promise<boolean> {
    // 1. Get module id from db from name
    let moduleDao = new ModuleDao(sqlConnector);
    let mod = await moduleDao.getModuleByName(moduleName);


    // 2. Check if new module or update of existing ong
    let userModuleDao = new UserModuleDao(sqlConnector);
    let allUserModules = await userModuleDao.getAll();
    let existingModule = allUserModules.find(m => m.moduleId === Number(mod.id) && m.userId === userId); //Todo specific db query?
    if (existingModule) {
        // 3.a update existing one
        existingModule.level = level;
        return userModuleDao.update(existingModule);
    } else {
        // 3.b insert new one
        let userModule = new UserModule(-1, userId, Number(mod.id), level);
        let newRowId = await userModuleDao.insert(userModule);
        if (newRowId)
            return true;
        else
            return false;
    }
}


export async function AddOrUpdateUser(sqlConnector: Sqlite, userId: string, userName: string, corpoName: string): Promise<boolean> {
    // 1. Check if new or existing user
    let userDao = new UserDao(sqlConnector);

    let user: User = null;
    try {
        user = await userDao.getById(userId);
    }
    catch{ }

    if (user) {
        user.name = userName;
        user.corpo = corpoName;
        return userDao.update(user);
    } else {
        user = new User(userId, userName, corpoName);

        let newRowId = await userDao.insert(user);
        if (newRowId)
            return true;
        else
            throw new Error("Erreur maj BDD");

    }
}

export async function ListUser(sqlConnector: Sqlite, corpoName: String = null): Promise<string> {
    let userdao = new UserDao(sqlConnector);
    let users = (await userdao.getAll()).filter(u => !corpoName || u.corpo == corpoName);

    return generateDebugMarkdownTable(users);
}

export async function DeleteUser(sqlConnector: Sqlite, userId: string): Promise<Boolean> {
    let userdao = new UserDao(sqlConnector);
    return userdao.deleteFromId(userId);
}



export async function GetUserModule(sqlConnector: Sqlite, userId: string): Promise<string> {
    // 1. Get all module ref
    let moduleDao = new ModuleDao(sqlConnector);
    let allModules = await moduleDao.getAll();

    // 2. Get all module of user
    let userModuleDao = new UserModuleDao(sqlConnector);
    let allUserModules = (await userModuleDao.getAll()).filter(f => f.userId === userId);

    // 3. Get list of view model
    let datas: Array<UserModuleViewModel> = new Array();
    allUserModules.forEach(elt => datas.push(new UserModuleViewModel(elt, allModules)));


    return generateDebugMarkdownTable(datas);
}

export async function TestUser(sqlConnector: Sqlite): Promise<string> {
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

function generateDebugMarkdownTable(data) {
    const header = '```Markdown\n';
    const footer = '\n```';

    let array = [];
    array.push(Object.getOwnPropertyNames(data[0]));

    data.forEach(function (d, index) {
        let currentRow = [];
        Object.getOwnPropertyNames(d).forEach(
            function (val, idx, array) {
                currentRow.push(d[val]);
            });
        array.push(currentRow);
    });
    var tab = Table(array);
    return header + tab + footer;
}