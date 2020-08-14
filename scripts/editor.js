//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const editorIpcRenderer = require("electron").ipcRenderer;
const fs = require("fs");
const configFileReader = require("../scripts/terrain-config-file-reader");
const startTimestamp = new Date();

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

editorIpcRenderer.on("main.relay.createCodeEditor", (event, fileLocation, fileType) => {
    tabs.create("Code Editor", "code-editor-tab.html");
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
