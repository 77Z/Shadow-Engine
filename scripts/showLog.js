//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const fs = require("fs");
const child_process = require("child_process");
const homedir = require("os").homedir();

module.exports = {
    showLog: function(logFileLoc) {
        fs.exists(logFileLoc, (exists, err) => {
            if (err) throw err;
            if (!exists) return false; else {
                fs.copyFile(logFileLoc, shadowEngineDataDir + "\\engine-data\\run.log", (err) => {
                    if (err) throw err;
                    child_process.execFile(homedir + "\\AppData\\Local\\Programs\\shadow-engine\\ShadowLog.exe");
                });
            }
        });
    }
}