//Global
var shadowEngineDataDir;
if (process.platform == "linux") {
    shadowEngineDataDir = require("os").homedir + "/Shadow Engine";
} else if (process.platform == "win32") {
    shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";
}

const { app } = require("electron").remote;
const { ipcRenderer } = require("electron");
const fs = require("fs");

var localesSelect = document.getElementById("locales-select");

function readLocalesToDropdown() {
    fs.readFile(shadowEngineDataDir + "\\engine-data\\locales.json", "utf-8", (err, data) => {
        if (err) throw err;
        var localesObject = JSON.parse(data);
        for (var i = 0; i < localesObject.length; i++) {
            var currentLocale = localesObject[i];
            var option = document.createElement("option");
            option.innerText = currentLocale.prettyName;
            option.value = currentLocale.id;
            localesSelect.appendChild(option);
        }
    });
}

window.onload = function() {
    readLocalesToDropdown();

      // ------------ //
     // localization //
    // ------------ //
    ipcRenderer.send("localization.getLocales", "localization");
    ipcRenderer.on("main.localization.returnLocales", (event, locales) => {
        document.title                                        = locales.windowtitle;
        document.getElementById("title").innerText            = locales.windowtitle;
        document.getElementById("set-btn").innerText          = locales.setBtn;
        document.getElementById("restart-msg").innerText      = locales.restartMsg;
        document.getElementById("shadow-debug-msg").innerText = locales.shadowDebugMsg;
        document.getElementById("shadow-debug-btn").innerText = locales.shadowDebugBtn;
    });
};

document.getElementById("set-btn").addEventListener("click", function() {
    var shadowConfig = JSON.parse(fs.readFileSync(shadowEngineDataDir + "\\engine-data\\config.json", "utf-8"));
    shadowConfig.locale = localesSelect.value;
    fs.writeFile(shadowEngineDataDir + "\\engine-data\\config.json", JSON.stringify(shadowConfig), (err) => {
        if (err) throw err;
        app.relaunch();
        app.quit();
    });
});

document.getElementById("shadow-debug-btn").addEventListener("click", function() {
    ipcRenderer.send("shadowSettings.restartDebug");
});
