process.on("unhandledRejection", (reason, p) => {
	console.error("Unhandled Rejection at:", p, "reason:", reason);
});

/* Vars */
const botOwner = process.env.BOT_OWNER.split(",") || [];
const botPrefix = process.env.BOT_PREFIX.split(",") || [];
const botPrefixDev = process.env.BOT_PREFIX_DEV.split(",") || [];

const allowedBots = [];
const allowedGuilds = [
	"420194593167114250"  // Test
	];

/* Checks */
if (botOwner.length == 0)
{
	console.error("No owner set");
	process.exit(1);
}

if (botPrefix.length == 0 || botPrefixDev.length == 0)
{
	console.error("No prefix set");
	process.exit(1);
}

/* Libs */
const http = require("http");
const express = require("express");

const fs = require("fs");
const path = require("path");
const moment = require("moment");

/* Discord */
const Discord = require("discord.js");

const discordOptions = {
	disabledEvents: ["TYPING_START", "VOICE_STATE_UPDATE", "VOICE_SERVER_UPDATE"]
};

const client = new Discord.Client(discordOptions);

/* BOT */
const BOT = require("./bot.js");
const bot = new BOT(client);

bot.log = (str) =>
{
	if (process.env.NODE_ENV === "dev") console.log(moment().format("YYYY MM DD HH:mm:ss") + " - " + str);
}

function reloadClass(className)
{
	const f = "./classes/" + className;

	if (fs.existsSync(f + ".js"))
	{
		delete require.cache[require.resolve(f)];
		return require(f);
	}

	return false;
}

function reloadCommand(commandName)
{
	const f = "./commands/" + commandName;

	if (fs.existsSync(f + ".js"))
	{
		delete require.cache[require.resolve(f)];
		return require(f);
	}

	return false;
}

function reloadCron(cronName)
{
	const f = "./crons/" + cronName;

	if (fs.existsSync(f + ".js"))
	{
		delete require.cache[require.resolve(f)];
		return require(f);
	}

	return false;
}

function reloadEvent(eventName)
{
	const f = "./events/" + eventName;

	if (fs.existsSync(f + ".js"))
	{
		delete require.cache[require.resolve(f)];
		return require(f);
	}

	return false;
}

async function main(bot)
{
	console.time("startBot");

	const client = bot.client;

	await bot.init();

	client.on("ready", () =>
	{
		console.log(`Bot (${client.user.id}) has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
		console.log(new Date().toUTCString() + "\n" + "-----------------------------");
		client.user.setActivity(`DEV`);
		client.user.setUsername("Hodor_dev");
	});

	client.on("message", message =>
	{
		// from dm, skip
		if (message.channel.type === "dm") return;

		// guild
		if (allowedGuilds.indexOf(message.guild.id) == -1)
		{
			console.log("Bot is not allowed in " + message.guild.name + " (" + message.guild.id + ")");
			return;
		}

		// first char
		let firstMessageChar = message.content.substr(0, 1);

 		// no prefix, skip the message
		if ( (process.env.NODE_ENV !== "dev" && botPrefix.indexOf(firstMessageChar) == -1) || (process.env.NODE_ENV === "dev" && botPrefixDev.indexOf(firstMessageChar) == -1) ) return;

		message.prefix = firstMessageChar;

		// message from bot, is bot allowed ?
		if (message.author.bot && allowedBots.indexOf(message.author.id) == -1) return;

		const args = message.content.slice(message.prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		/**
		* RELOAD
		*/
		if (command == "reloadcmd")
		{
			message.delete(5000);

			if (botOwner.indexOf(message.author.id) == -1 || args.length != 1)
			{
				return;
			}

			let cmdContent = reloadCommand(args[0]);

			if (cmdContent !== false)
			{
				console.log(`command ${args[0]} reloaded !`);
				bot.commands[args[0]] = new cmdContent(bot);
			}
		}

		if (command == "reloadcron")
		{
			message.delete(5000);

			if (botOwner.indexOf(message.author.id) == -1 || args.length != 1)
			{
				return;
			}

			let cronContent = reloadCron(args[0]);

			if (cronContent !== false)
			{
				console.log(`cron ${args[0]} reloaded !`);
				bot.crons[args[0]] = new cronContent(bot);
			}
		}

		if (command == "reloadevent")
		{
			message.delete(5000);

			if (botOwner.indexOf(message.author.id) == -1 || args.length != 1)
			{
				return;
			}

			let eventContent = reloadEvent(args[0]);

			if (eventContent  !== false)
			{
				console.log(`event ${args[0]} reloaded !`);
				bot.events[args[0]] = new eventContent(bot);
			}
		}

		if (command == "reloadclass")
		{
			message.delete(5000);

			if (botOwner.indexOf(message.author.id) == -1 || args.length != 1)
			{
				return;
			}

			if (["sqlite", "functions", "helpers", "queries"].indexOf(args[0]) != -1)
			{
				let classContent = reloadClass(args[0]);

				if (classContent !== false)
				{
					console.log(`class ${args[0]} reloaded !`);

					if (args[0] == "sqlite") bot.sql = new classContent(bot);
					if (args[0] == "helpers") bot.helpers = new classContent(bot);
					if (args[0] == "queries") bot.queries = new classContent(bot);
					if (args[0] == "functions") bot.functions = new classContent(bot);
				}
			}
		}

		if (typeof bot.commands[command] !== "undefined" && typeof bot.commands[command].run !== "undefined")
		{
			let cmd = bot.commands[command];

			if ( (process.env.NODE_ENV !== "dev" && cmd._config.prefix.indexOf(message.prefix) != -1) || (process.env.NODE_ENV === "dev" && botOwner.indexOf(message.author.id) != -1) )
			{
				if (cmd._config.timeout > 0)
				{
					message.delete(cmd._config.timeout);
				}
				else if (cmd._config.timeout == -1)
				{
					message.delete();
				}

				cmd.run(message, args);
			}
		}
	});

	setInterval(() =>
	{
    Object.keys(bot.crons).forEach(function(key)
    {
      let cron = bot.crons[key];
      cron.run();
    });
	}, 60000);

	client.login(process.env.BOT_TOKEN);

	console.timeEnd("startBot");
}

main(bot);

if (process.env.NODE_ENV === "dev")
{
	const chokidar = require("chokidar");

	let watchOptions = {ignored: /(^|[\/\\])\../, alwaysStat: false, awaitWriteFinish: { stabilityThreshold: 2000, pollInterval: 100 }};

	chokidar.watch("classes/", watchOptions).on("change", (event) => {
		let filename = path.basename(event);
		let className = filename.split(".").shift();
		let classContent = reloadClass(className);

		if (["functions", "helpers", "sqlite", "queries"].indexOf(className) != -1)
		{
			if (className == "sqlite") bot.sql = new classContent(bot);
			if (className == "helpers") bot.helpers = new classContent(bot);
			if (className == "queries") bot.queries = new classContent(bot);
			if (className == "functions") bot.functions = new classContent(bot);

			console.log(`chokidar: class ${filename} reloaded !`);
		}
	});

	chokidar.watch("commands/", watchOptions).on("change", (event) => {
		let filename = path.basename(event);
		let className = filename.split(".").shift();
		let classContent = reloadCommand(className);
		bot.commands[className] = new classContent(bot);

		console.log(`chokidar: command ${filename} reloaded !`);
	});

	chokidar.watch("crons/", watchOptions).on("change", (event) => {
		let filename = path.basename(event);
		let className = filename.split(".").shift();
		let classContent = reloadCron(className);
		bot.crons[className] = new classContent(bot);

		console.log(`chokidar: cron ${filename} reloaded !`);
	});

	setInterval(() => {
		let used = process.memoryUsage().heapUsed / 1024 / 1024;
		console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
	}, 1000 * 60 * 5);
}

/* express */
const app = express();

/* Keep alive */
app.get("/", (request, response) =>
{
	let d = new Date();
	response.setHeader("Content-Type", "text/html");
	response.write(d.toString());
	response.end();
});

app.listen(process.env.PORT);

setInterval(() =>
{
	http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 240000);
