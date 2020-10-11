//Global
var shadowEngineDataDir;
if (process.platform == "linux") {
    shadowEngineDataDir = require("os").homedir + "/Shadow Engine";
} else if (process.platform == "win32") {
    shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";
}

const fs = require("fs");

module.exports = {
    exportGame: function(options) {
        var gameName    = options.gameName;
        var version     = options.version;
        var copyright   = options.copyright;
        var winHeight   = options.winHeight;
        var winWidth    = options.winWidth;
        var winFrame    = options.winFrame;
        var topMost     = options.topMost;
        var minimizable = options.minimizable;
        var maximizable = options.maximizable;
        var fullscreen  = options.fullscreen;
        var movable     = options.movable;
        var resizable   = options.resizable;
        var winTitle    = options.winTitle;
        var discordRPC  = options.discordRPC;
        
        var distFolder;

        fs.readFile(shadowEngineDataDir + "\\engine-data\\proj.sec", 'utf-8', (err, data) => {
            if (err) throw err;
            var linebreak = /\r?\n|\r/g;
            var processedData = data.replace(linebreak, "");

            distFolder = shadowEngineDataDir + "\\projects\\" + processedData + "\\dist";
            fs.mkdir(distFolder, (err) => {
                if (err) throw err;
                fs.mkdir(distFolder + "\\build", (err) => {
                    if (err) throw err; else step2();
                });
            });
        });

        var step2 = () => {
            var distbuildfld = distFolder + "\\build";
            function generatemainjs() {
                fs.writeFile(distbuildfld + "\\main.js", `function cw(){let e=new BrowserWindow({height:450,width:800,frame:!0,webPreferences:{nodeIntegration:!0,nodeIntegrationInSubFrames:!0,nodeIntegrationInWorker:!0,webgl:!0,webviewTag:!0,autoplayPolicy:"no-user-gesture-required"},alwaysOnTop:!1,darkTheme:!1,closable:!0,minimizable:!0,maximizable:!0,backgroundColor:"#000000",fullscreen:!1,movable:!0,resizable:!0,skipTaskbar:!1,title:"null"});e.loadURL("file://"+__dirname"+"/g/index.html"),e.on("closed",function(){e=null})}const{app:app,BrowserWindow:BrowserWindow}=require("electron");app.on("ready",cw),app.on("window-all-closed",function(){"darwin"!==process.platform&&app.quit()}),app.on("activate",function(){null===mw&&cw()});`, 'utf-8', (err) => {if (err) throw err; });
            }
        };


    }
}