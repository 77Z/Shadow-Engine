//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const fs = require("fs");
const shadowProgramDir = require("os").homedir() + "\\AppData\\Local\\Programs\\shadow-engine";

module.exports = {
    install: function(callbackfunc) {
        fs.exists(shadowProgramDir + "\\DiscordRPC", (err) => {
            if (err) throw err;
            fs.mkdir(shadowEngineDataDir + "plugins\\DiscordRPC", (err) => {
                if (err) throw err;
                fs.mkdir(shadowEngineDataDir + "plugins\\DiscordRPC\\transports", (err) => {
                    if (err) throw err;
                    fs.copyFile(shadowProgramDir + "\\DiscordRPC\\client.js", shadowEngineDataDir + "plugins\\DiscordRPC\\client.js", (err) => {
                        if (err) throw err;
                        fs.copyFile(shadowProgramDir + "\\DiscordRPC\\constants.js", shadowEngineDataDir + "plugins\\DiscordRPC\\constants.js", (err) => {
                            if (err) throw err;
                            fs.copyFile(shadowProgramDir + "\\DiscordRPC\\index.js", shadowEngineDataDir + "plugins\\DiscordRPC\\index.js", (err) => {
                                if (err) throw err;
                                fs.copyFile(shadowProgramDir + "\\DiscordRPC\\util.js", shadowEngineDataDir + "plugins\\DiscordRPC\\util.js", (err) => {
                                    if (err) throw err;
                                    fs.copyFile(shadowProgramDir + "\\DiscordRPC\\transports\\index.js", shadowEngineDataDir + "plugins\\DiscordRPC\\transports\\index.js", (err) => {
                                        if (err) throw err;
                                        fs.copyFile(shadowProgramDir + "\\DiscordRPC\\transports\\ipc.js", shadowEngineDataDir + "plugins\\DiscordRPC\\transports\\ipc.js", (err) => {
                                            if (err) throw err;
                                            fs.copyFile(shadowProgramDir + "\\DiscordRPC\\transports\\websocket.js", shadowEngineDataDir + "plugins\\DiscordRPC\\transports\\websocket.js", (err) => {
                                                if (err) throw err;
                                                callbackfunc();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}