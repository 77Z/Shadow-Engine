//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const editorIpcRenderer = require("electron").ipcRenderer;
const fs = require("fs");

var projName = null;

editorIpcRenderer.on("load-proj", (event, projectName) => {
    //Show name in top right corner
    document.getElementById("cornerGameName").innerText = projectName;
    projName = projectName;
    editor.setProjectActiveFile(projectName);
});

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