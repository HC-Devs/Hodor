import * as WebRequest from 'web-request';

export async function Insulte() {
    const baseurl ="http://insultron.fr/";
    let result = await WebRequest.get(baseurl);
    var DomParser = require('dom-parser');
    let parser = new DomParser();
    let htmlDoc = parser.parseFromString(result.content, "application/xml");
    let anchors =htmlDoc.getElementsByClassName('well well-lg');
    let insulte : string = anchors[0].textContent;

    return  replaceAll(replaceAll(insulte,'\n',''), '\t','');
}

export async function Citation(word: string):Promise<string> {
    const baseurl = "http://www.citations.co/recherche/";
    let url = baseurl + word;
    let result = await WebRequest.get(url);

    var DomParser = require('dom-parser');
    let parser = new DomParser();
    let htmlDoc = parser.parseFromString(result.content, "application/xml");
    let anchors = htmlDoc.getElementsByClassName('first');
    if (anchors && anchors.length > 0) {
        let i = Math.floor(Math.random() * anchors.length);
        let rawurlcit = anchors[i].attributes.filter(f => f.name === 'href')[0].value;
        let author = anchors[i].attributes.filter(f => f.name === 'title')[0].value;
        let citencoded = rawurlcit.split('/').pop();
        let cit = replaceAll(replaceAll(decodeURIComponent(citencoded), '-', ' '), word, '**' + word + '**');
        cit += ` *(${author})*`;
        return cit;
    }
    return "Il vaut mieux se taire et passer pour un con plutôt que de parler et de ne laisser aucun doute sur le sujet `*Pierre Desproges*`";
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}