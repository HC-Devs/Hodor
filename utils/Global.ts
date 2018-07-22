export class Global {
    static nodeVersion: number = Number(process.version.slice(1).split(".")[0]);
    static nodeDomain: string = process.env.PROJECT_DOMAIN;
    static nodePort: string = process.env.PORT;
    static nodeEnv: string = process.env.NODE_ENV;

    static dataBaseDir: string = "./.data";
    static dataBaseName: string = "hc.sqlite3";
    static botOwner: string[] = process.env.BOT_OWNER.split(",") || [];
    static allowedGuilds: string[] = [
        "390625052959309826", // Hadès Corpo
        "413390615158718464",
        "420194593167114250" // Test
    ];
    static allowedBots: string[] = [];
    static helpPrefix: string = '?';
    static prefix: string = process.env.BOT_PREFIX;
    static prefixDev: string = process.env.BOT_PREFIX_DEV;
    static token: string = process.env.BOT_TOKEN;
    static timeout: number = 15000;

    static pathCommandsDirectory: string = "./commands/";
    static pathEventsDirectory: string = "./events/";
    static pathJobsDirectory: string = "./jobs/";
}