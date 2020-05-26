//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const editorIpcRenderer = require("electron").ipcRenderer;
const fs = require("fs");
const configFileReader = require("../scripts/terrain-config-file-reader");

var projName = null;

editorIpcRenderer.on("load-proj", (event, projectName) => {
    //Show name in top right corner
    document.getElementById("cornerGameName").innerText = projectName;
    projName = projectName;
    editor.setProjectActiveFile(projectName);
});

function getProjFromFile() {
    var proj = configFileReader.readConfigFile(shadowEngineDataDir + "\\engine-data\\proj.sec", 1);
    //Show name in top right corner
    document.getElementById("cornerGameName").innerText = proj;
    projName = proj;
    /* editor.setProjectActiveFile(proj); */
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