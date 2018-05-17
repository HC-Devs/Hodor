/**
* Chuck !
*/
const fs = require("fs");
const path = require("path");
const {promisify} = require("util");

const readDirAsync = promisify(fs.readdir);

class BOT
{
	constructor (client)
	{
		this.client = client;
	}

	async init()
	{
		/* Commands */
		this.commands = {};

		await readDirAsync("./commands/").then((files) =>
		{
			let jsFiles = files.filter(f => f.split(".").pop() === "js");

			if (jsFiles.length <= 0)
			{
				console.log("No commands to load!");
				return;
			}

			console.log(`Loading ${jsFiles.length} commands!`);

			jsFiles.forEach((f, i) =>
			{
				let className = f.split(".").shift();
				let classContent = require(`./commands/${f}`);
				console.log(`${i + 1}: ${f} loaded! : className: ${className}`);
				this.commands[className] = new classContent(this);
			});
		});

    /* Crons */
		this.crons = {};
    
		/* Locks */
		this.locks = {};

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
}

	/* Export */
module.exports = BOT;
