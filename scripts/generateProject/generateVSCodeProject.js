//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

//creates a vscode project in the open project folder

const getProject = require("../../scripts/get-project");
const fs = require("fs");

module.exports = function() {
    var project = getProject();
    fs.writeFile(`${shadowEngineDataDir}\\projects\\${project}\\${project}.code-workspace`, `{\n	"folders": [\n		{\n			"path": "./Source"\n		}\n	],\n	"settings": {\n		"git.ignoreLimitWarning": true\n	}\n}\n`, (err) => {
        if (err) throw err;
    });
}