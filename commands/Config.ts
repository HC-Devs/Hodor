export class Config {

    name: string;
    aliases: string[];
    prefix: string[];
    timeout: number;
    maxLevel: number;

    constructor(name: string, aliases = [], prefix = ['!'], timeout = 5000, maxLevel = 10) {
        this.name = name;
        this.aliases = aliases;
        this.prefix = prefix;
        this.timeout = timeout;
        this.maxLevel = maxLevel;
    }
}