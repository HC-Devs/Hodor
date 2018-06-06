class Bot {
    async init() {
        /* Functions */
        const FUNCTIONS = require("./classes/functions.js");
        this.functions = new FUNCTIONS(this);

        /* Discord Helpers */
        const HELPERS = require("./classes/helpers.js");
        this.helpers = new HELPERS(this);

        /* MySQL */
        const SQLITE = require("./classes/sqlite.js");
        this.sql = new SQLITE(this);

        /* Queries */
        const QUERIES = require("./classes/queries.js");
        this.queries = new QUERIES(this);

        return this;
    }

    async watch() {
        chokidar.watch("classes/", watchOptions).on("change", (event) => {
            let className = path.basename(event, path.extname(event));
            let classContent = BOT.reloadClass(event);

            if (["functions", "helpers", "sqlite", "queries"].indexOf(className) !== -1) {
                if (className === "sqlite") this.sql = new classContent(this);
                if (className === "helpers") this.helpers = new classContent(this);
                if (className === "queries") this.queries = new classContent(this);
                if (className === "functions") this.functions = new classContent(this);

                this.logger.log(`chokidar: class ${className} reloaded !`);
            }
        });

        chokidar.watch("commands/", watchOptions).on("change", (event) => {
            let className = path.basename(event, path.extname(event));
            let classContent = BOT.reloadCommand(event);
            this.commands[className] = new classContent(this);

            this.logger.log(`chokidar: command ${className} reloaded !`);
        });

        chokidar.watch("crons/", watchOptions).on("change", (event) => {
            let className = path.basename(event, path.extname(event));
            let classContent = BOT.reloadCron(event);
            this.crons[className] = new classContent(this);

            this.logger.log(`chokidar: cron ${className} reloaded !`);
        });

        chokidar.watch("events/", watchOptions).on("change", (event) => {
            let className = path.basename(event, path.extname(event));
            let eventContent = BOT.reloadEvent(event);
            if (eventContent !== false) {
                this.logger.log(`chokidar: event ${className} reloaded !`);
            }
        });
    }
}