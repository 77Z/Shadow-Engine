//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const ipc = require("electron").ipcRenderer;
const fileNameChecker = require("../../../scripts/valid-file-name-checker");
const fs = require("fs");
const getProject = require("../../../scripts/get-project");

ipc.on("main.directory", (e, directory) => {
    document.getElementById("createnewin").innerText = "Create New Folder in " + directory;
});

var btn = document.getElementById("btn");
setInterval(() => {
    var wat = fileNameChecker(document.getElementById("input").value);
    if (wat !== true) {
        document.getElementById("err").innerText = wat;
        btn.style.background = "gray";
    } else {
        document.getElementById("err").innerText = "";
        btn.style.background = "#00c97c";
    }
}, 100);

function checkForValidNameOnce() {
    var wat = fileNameChecker(document.getElementById("input").value);
    if (wat !== true) {
        return false;
    } else {
        return true;
    }
}

btn.addEventListener("click", function() {
    if (checkForValidNameOnce()) {
        //Create Folder
        var prefix =
          shadowEngineDataDir + "\\projects\\" + getProject() + "\\Source";
        fs.mkdir(prefix + "\\" + document.getElementById("input").value, (err) => {
            if (err) throw err; else {
                ipc.send("reloadExplorer");
                window.close();
            }
        });
    }
});