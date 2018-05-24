/**
 * Common / internal functions
 */
class FUNCTIONS {
    constructor(bot) {
        this.bot = bot;
    }

    isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers) {
        return (allowedGuilds.length > 0 && allowedGuilds.indexOf(message.guild.id) !== -1) ||
            (allowedChannels.length > 0 && allowedChannels.indexOf(message.channel.id) !== -1) ||
            (allowedRoles.length > 0 && message.member.roles.some(r => allowedRoles.includes(r.name))) ||
            (allowedUsers.length > 0 && allowedUsers.indexOf(message.author.id) !== -1);
    }

    parseArgs(argv, argList) {
        // Removing command name
        // argv = argv.slice(1);

        // Returned object
        var args = {};

        var argName = "_", argValue = [];

        // For each argument
        argv.forEach(function (arg, index) {
            // Found a valid arg
            if (arg.indexOf("-") === 0 && argList.indexOf(arg.substr(1)) != -1) {
                if (argName !== "") {
                    args[argName] = argValue.join(" ");
                }

                argName = arg.substr(1);
                argValue = [];
            }
            else {
                if (argName !== "") {
                    argValue.push(arg);
                }
            }
        });

        if (argName !== "") {
            args[argName] = argValue.join(" ");
        }

        return args;
    }

    base64Encode(str) {
        return new Buffer(str).toString('base64');
    }

    base64Decode(str) {
        return new Buffer(str, 'base64').toString('utf8');
    }

    between(x, min, max) {
        return x >= min && x <= max;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getTS() {
        return Math.floor(Date.now() / 1000);
    }

    roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }

    randomColor() {
        return Math.floor(Math.random() * 16777214) + 1;
    }

    posS(int) {
        return (int != 1 ? "s" : "");
    }
}

module.exports = FUNCTIONS;
