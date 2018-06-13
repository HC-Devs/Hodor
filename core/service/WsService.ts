import { Sqlite } from "../../classes/Sqlite";
import { WsDao } from "../dao/WsDao";
import { WsStatus } from "../model/WsStatus";
import { FunctionnalError } from "../../exceptions/FonctionnalError";
import { Ws } from "../model/Ws";


/**
 * Crée un nouvelle WS si aucune autre n'est en préparation
 * @param sqlConnector 
 */
export async function AddWs(sqlConnector: Sqlite){
    let wsDao = new WsDao(sqlConnector);

    let allWs = await wsDao.getAll();
    if(allWs.find(ws => ws.status <= WsStatus.EN_PREPARATION)){
        throw new FunctionnalError("Une Ws non démarrée existe déjà");
    }

    wsDao.insert(new Ws(-1, new Date(),WsStatus.NON_LANCEE ));
}

/**
 * Passe le statut de la WS à l'état: En recherche d'adversaire
 * @param sqlConnector 
 * @param wsStatus : Par défaut EN_RECHERCHE
 * @param wsStartDate : Par défaut la date courante
 */
export async function SearchWs(sqlConnector: Sqlite, wsStartDate : Date = new Date()){
    let wsDao = new WsDao(sqlConnector);

    let allWs = await wsDao.getAll();
    if(allWs.find(ws => ws.status === WsStatus.EN_COURS)){
        throw new FunctionnalError("Une Ws est déjà en cours");
    }
    let currentWs = allWs.find((ws => ws.status === WsStatus.NON_LANCEE));
    if(currentWs){
        currentWs.status =WsStatus.EN_RECHERCHE ;
        currentWs.startDate = wsStartDate ;
        wsDao.update(currentWs);
    }
    else{
        throw new FunctionnalError("Aucune Ws non lancée n'existe");
    }
}

/**
 * Passe le statut de la WS à l'état : en préparation
 * @param sqlConnector 
 * @param wsStartDate : La date de fin de préparation (sinon estimée auto depuis la date courante)
 */
export async function PrepareWs(sqlConnector: Sqlite, wsStartDate : Date = null){
    let wsDao = new WsDao(sqlConnector);

    let allWs = await wsDao.getAll();
    if(allWs.find(ws => ws.status === WsStatus.EN_COURS)){
        throw new FunctionnalError("Une Ws est déjà en cours");
    }
    let currentWs = allWs.find(ws => ws.status <= WsStatus.EN_RECHERCHE)
    if(currentWs){
        currentWs.status =WsStatus.EN_PREPARATION ;
        if(wsStartDate === null){
            wsStartDate = new Date();
            wsStartDate.setTime(wsStartDate.getTime() + (11*60*60*1000)); // calculate estimated start date
        }
        currentWs.startDate = wsStartDate;
        wsDao.update(currentWs);
    }
    else{
        throw new FunctionnalError("Aucune Ws en recherche ou non lancée n'existe");
    }
}

/**
 * Passe le statut de la WS à l'état : en cours
 * @param sqlConnector 
 * @param wsStartDate : La date de démarrage réelle
 */
export async function StartWs(sqlConnector: Sqlite, wsStartDate : Date = new Date()){
    let wsDao = new WsDao(sqlConnector);

    let allWs = await wsDao.getAll();
    // First: search if current started exist (to update start date)
    let currentWs = allWs.find(ws => ws.status === WsStatus.EN_COURS); 
   
    // Else: get not yet started one
     currentWs = currentWs || allWs.find(ws => ws.status <= WsStatus.EN_PREPARATION)
    if(currentWs){
        currentWs.status =WsStatus.EN_COURS ;
        currentWs.startDate = wsStartDate;
        wsDao.update(currentWs);
    }
    else{
        throw new FunctionnalError("Aucune Ws en prération ou en recherche ou non lancée n'existe");
    }
}


/**
 * Passe le statut de la WS à l'état : en fin
 * @param sqlConnector 
 * @param win : Gagnée ou perdu (pas de match nul chez HC)
 */
export async function EndWs(sqlConnector: Sqlite, win: boolean){
    let wsDao = new WsDao(sqlConnector);

    let allWs = await wsDao.getAll();
    let currentWs = allWs.find(ws => ws.status === WsStatus.EN_COURS)
    if(currentWs){
        currentWs.status = win ? WsStatus.GAGNEE : WsStatus.PERDUE;
        wsDao.update(currentWs);
    }
    else{
        throw new FunctionnalError("Aucune Ws en cours n'existe");
    }
}

export async function ListWs(sqlConnector: Sqlite): Promise<string> {
    let wsDao = new WsDao(sqlConnector);
    let wss = (await wsDao.getAll()).sort((w1, w2) => w1.startDate < w2.startDate? 1 : -1);
  
    return generateDebugMarkdownTable(wss);
}

// todo externalise
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
    
    const Table = require('markdown-table');
    var tab = Table(array);
    return header + tab + footer;
}