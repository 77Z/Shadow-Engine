//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const editorIpcRenderer = require("electron").ipcRenderer;
const fs = require("fs");
const configFileReader = require("../scripts/terrain-config-file-reader");
const startTimestamp = new Date();
const {shell} = require("electron");

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

//this variable creates the main tab and returns
//the tabs id
var maintabId = tabs.create("Main", "main.html", false);

var editortabId = tabs.create("Code Editor", "code-editor-tab.html", false);

//Forwarding Data to tabs START

editorIpcRenderer.on("FTT", (event, data) => {
    document.getElementById(maintabId).contentWindow.postMessage("FTT:" + data, "*");
});

editorIpcRenderer.on("main.relay.createCodeEditor", (event, fileName, fileLocation) => {
    document.getElementById(editortabId).contentWindow.postMessage(fileLocation, "*");
});

//Forwarding Data to tabs END

//Help Button
document.getElementById("help-button").addEventListener("click", function() {
    shell.openExternal("https://github.com/77Z/Shadow-Engine/wiki/Help");
});