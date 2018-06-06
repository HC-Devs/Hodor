export class Config {
    static nodeVersion: number = Number(process.version.slice(1).split(".")[0]);
    static nodeDomain: string = process.env.PROJECT_DOMAIN;
    static nodePort: string = process.env.PORT;
    static nodeEnv: string = process.env.NODE_ENV;

    static dataBaseDir: string = "./.data";
    static botOwner: string[] = process.env.BOT_OWNER.split(",") || [];
    static prefix: string = process.env.BOT_PREFIX;
    static prefixDev: string = process.env.BOT_PREFIX_DEV;
    static token: string = process.env.BOT_TOKEN;

    static pathCommandsDirectory: string = "./commands/";
    static pathEventsDirectory: string = "./events/";
    static pathClassesDirectory: string = "./classes/";
    static pathCronsDirectory: string = "./crons/";
}