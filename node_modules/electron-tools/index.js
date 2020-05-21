const {shell, screen} = require("electron");
const os = require('os');
const child_process = require("child_process");
const fs = require("fs");

module.exports = {
    openLink: function(link) {
        if (typeof link !== "string") throw new TypeError("Only strings are accepted");
        shell.openExternal(link);
    },
    openExplorer: function(dir) {
        if (dir == undefined) {
            shell.showItemInFolder(os.homedir());
        } else {
            if (typeof dir !== "string") throw new TypeError("Only strings are accepted");
            shell.showItemInFolder(dir);
        }
    },
    getPrimaryDisplaySize: function(hORw) {
        var screen = screen.getPrimaryDisplay().size;
        if (typeof hORw != "string") throw new TypeError("Must be string!");
        if (hORw == "height") {
            return screen.height;
        } else if (hORw == "width") {
            return screen.width;
        } else {
            throw new Error();
        }
    },
    moveMouse: function(x, y) {
        if (typeof x !== "number" || typeof y !== "number") throw new TypeError("Only numbers are accepted");

        child_process.exec(__dirname + "\\aet.exe --moveMouse " + x + " " + y, (error, stdout, stderr) => {
            if (error) {
                console.error(`execute error: ${error}`);
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    },
    openNotepad: function() {
        child_process.exec("notepad.exe");
    },
    openRegistry: function() {
        child_process.exec("regedit");
    },
    openTerminal: function() {
        child_process.exec("cmd");
    },
    runCommand: function(commandToRun) {
        child_process.exec(commandToRun);
    },
    runCommandInTerminal: function(commandToRunInNewTerminal) {

        //var fileLoc = os.homedir() + "\\AppData\\Local\\Temp\\electron-tools-cmd-window" + Math.random + ".bat";

        //fs.writeFile(fileLoc, commandToRunInNewTerminal, function (err) {
        //    if (err) throw err;
        //    child_process.execFile(fileLoc, function(error, stdout, stderr) {
        //        if (error) console.log(`execute err: ${error}`);
        //        console.log(`stdout: ${stdout}`);
        //        console.log(`stderr: ${stderr}`);
        //    });
        //});
        child_process.execFile("start cmd /k" + commandToRunInNewTerminal, function(error, stdout, stderr) {
            if (error) console.log(`execute err: ${error}`);
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    },
    simulateKeypress: function(keys) {
        child_process.exec(`cscript.exe ${__dirname}\\keypress.vbs /keys:"${keys}"`);
    },
    screenshot: function() {


        //TODO: ADD SCREENSHOT FUNCTION


    },
    click: function(mousebtn, x, y) {
        if (typeof mousebtn !== "string") throw new TypeError("Must be string left or right");
        if (typeof x !== "number" || typeof y !== "number") throw new TypeError("x and/or y must be integers");

        if (mousebtn == "left") {
            child_process.exec(__dirname + "\\aet.exe --mouseClick " + x + " " + y);
        } else if (mousebtn == "right") {
            //TODO: add rightclick function in C#
        } else {
            throw new TypeError("mousebtn must be left or right");
        }
    },
    lockWorkstation: function() {
        child_process.exec(__dirname + "\\aet.exe --lockWorkstation");
    },
    externalWindows: {
        checkForWindow: function(windowName) {
            if (typeof windowName !== "string") throw new TypeError("windowName must be a string!");
            child_process.exec(__dirname + '\\aet.exe --checkForWindow "' + windowName + '"', (err, stdout, stderr) => {
                if (err) throw err;
                if (stderr) throw stderr;
                if (stdout) {
                    return stdout;
                }
            });
        },
        moveWindow: function(windowName, x, y) {
            if (typeof windowName !== "string") throw new TypeError("windowName must be a string!");
            if (typeof x !== "number" || typeof y !== "number") throw new TypeError("x and/or y must both be numbers!");
            child_process.exec(__dirname + '\\aet.exe --moveWindow "' + windowName + '" ' + x + " " + y);
        },
        setWindowTitle: function(windowName, newTitle) {
            if (typeof windowName !== "string") throw new TypeError("windowName must be a string!");
            if (typeof newTitle !== "string") throw new TypeError("newTitle must be a string!");
            child_process.exec(__dirname + '\\aet.exe --setWindowTitle "' + windowName + '" "' + newTitle + '"', (err, _stdout, stderr) => {
                if (err) throw err;
                if (stderr) throw stderr;
            });
        },
        minimizeWindow: function(windowName) {
            if (typeof windowName !== "string") throw new TypeError("windowName must be a string!");
            child_process.exec(__dirname + '\\aet.exe --minimizeWindow "' + windowName + '"', (err, stdout, stderr) => {
                if (err) throw err;
                if (stderr) throw stderr;
            });
        }
    }
};