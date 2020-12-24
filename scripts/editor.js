//Global
var shadowEngineDataDir;
if (process.platform == "linux") {
    shadowEngineDataDir = require("os").homedir + "/Shadow Engine";
} else if (process.platform == "win32") {
    shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";
}

const editorIpcRenderer = require("electron").ipcRenderer;
const fs = require("fs");
const configFileReader = require("../scripts/terrain-config-file-reader");
const startTimestamp = new Date();
const {shell} = require("electron");

const localizationData = require("../resources/localization");
const engineConfig = JSON.parse(fs.readFileSync(shadowEngineDataDir + "\\engine-data\\config.json", "utf-8"));
const selectedLocale = engineConfig.locale;
//extract localization data from localization.js
var localeData;
for (var i = 0; i < localizationData.length; i++) {
    if (localizationData[i].id == selectedLocale) {
        localeData = localizationData[i];
    }
}

var showEditorFPS = true;

var projName = null;

editorIpcRenderer.on("load-proj", (event, projectName) => {
    //Show name in top right corner
    document.getElementById("cornerGameName").innerText = projectName;
    projName = projectName;
    editor.setProjectActiveFile(projectName);

    editorIpcRenderer.send("ShadowDiscordRPC.setStatus", {
        details: "Working on: " + projectName,
        state: "In the Editor",
        startTimestamp,
        largeImageKey: 'shadowengine',
        largeImageText: "Shadow Engine",
        smallImageKey: "shadow-worker",
        smallImageText: projectName
    });
});

editorIpcRenderer.on("main.relay.createTab", (event, name, URL) => {
    tabs.create(name, URL);
});

function getProjFromFile() {
    var proj = configFileReader.readConfigFile(shadowEngineDataDir + "\\engine-data\\proj.sec", 1);
    //Show name in top right corner
    document.getElementById("cornerGameName").innerText = proj;
    projName = proj;
    /* editor.setProjectActiveFile(proj); */

    editorIpcRenderer.send("ShadowDiscordRPC.setStatus", {
        details: "Working on: " + projName,
        state: "In the Editor",
        startTimestamp,
        largeImageKey: 'shadowengine',
        largeImageText: "Shadow Engine",
        smallImageKey: "shadow-worker",
        smallImageText: projName
    });
}
getProjFromFile();

var editor = {
    setProjectActiveFile: function(projectName) {
        fs.writeFile(shadowEngineDataDir + "\\engine-data\\proj.sec", projectName + "\n", (err) => {
            if (err) throw err; else return true;
        });
    }
}

document.getElementById("top").addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

const times = [];
let fps;

if (showEditorFPS) {
    function refresh() {
        window.requestAnimationFrame(() => {
            const now = performance.now();
            while (times.length > 0 && times[0] <= now - 1000) {
                times.shift();
            }
            times.push(now);
            fps = times.length;
            document.getElementById("fps-counter").innerText = "FPS: " + fps;
            refresh();
        });
    }
    refresh();
}

var preallocatedmaintabname = "";
var preallocatededitortabname = "";

window.onload = function() {
    document.title            = localeData.data.editor.editorwindowtitle;
    preallocatedmaintabname   = localeData.data.editor.mainTab;
    preallocatededitortabname = localeData.data.editor.editorTab;

    readyToLoadTabs();
};

function readyToLoadTabs() {
    //this variable creates the main tab and returns
    //the tabs id
    var maintabId = tabs.create(preallocatedmaintabname, "main.html", false);

    var editortabId = tabs.create(preallocatededitortabname, "code-editor-tab.html", false);

    //Forwarding Data to tabs START

    editorIpcRenderer.on("FTT", (event, data) => {
        document.getElementById(maintabId).contentWindow.postMessage("FTT:" /* Forward to terminal */ + data, "*");
    });

    editorIpcRenderer.on("main.relay.createCodeEditor", (event, fileName, fileLocation) => {
        document.getElementById(editortabId).contentWindow.postMessage("FLL:" /* File Loader */ + fileLocation, "*");
    });

    //LOCALIZATION RELAY

    editorIpcRenderer.on("main.localization.returnRelayLocales", (event, relaytab, localeData) => {
        switch(relaytab) {
            case "code-editor":
                document.getElementById(editortabId).contentWindow.postMessage("LOC:" /* Locale Data */ + JSON.stringify(localeData), "*");
                break;
        }
    });

    //Forwarding Data to tabs END

    //Help Button
    document.getElementById("help-button").addEventListener("click", function() {
        shell.openExternal("https://github.com/77Z/Shadow-Engine/wiki/Help");
    });
}