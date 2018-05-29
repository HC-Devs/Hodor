if (process.version.slice(1).split(".")[0] < 9) {
    throw new Error("Node 9.0.0 or higher is required. Update Node on your system.");
}

process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error(`Uncaught Exception: ${errorMsg}`);
    process.exit(1);
});

process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at:", p, "reason:", reason);
});

require('./hodor.js').init().then(() => {
    if (process.env.PORT && process.env.PROJECT_DOMAIN) {
        const express = require('express');
        const http = require('http');
        const app = express();
        app.get("/", (request, response) => {
            let d = new Date();
            response.setHeader("Content-Type", "text/html");
            response.write(d.toString());
            response.end();
        });
        app.listen(process.env.PORT);
        setInterval(() => {
            http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
        }, 240000);
    }
});