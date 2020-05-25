//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const {app, BrowserWindow, ipcMain, Menu, MenuItem, dialog, globalShortcut} = require("electron");
const showLog = require("./scripts/showLog");
const fs = require("fs");
const discordRpc = require("./scripts/discordRPC");
const devEnabled = false;
const shadowProgramDir = require("os").homedir() + "\\AppData\\Local\\Programs\\shadow-engine";

app.on('ready', function() {
    fs.exists(shadowEngineDataDir, (exists, err) => {
        if (err) throw err;
        if (!exists) {
            fs.mkdir(shadowEngineDataDir, (err) => {
                if (err) throw err;
                fs.mkdir(shadowEngineDataDir + "\\engine-data", (err) => {
                    if (err) throw err;
                    fs.writeFile(shadowEngineDataDir + "\\engine-data\\settings.sec", 'frame:false\n', (err) => {
                        if (err) throw err;
                        fs.mkdir(shadowEngineDataDir + "\\projects", (err) => {
                            if (err) throw err;
                            fs.writeFile(shadowEngineDataDir + "\\engine-data\\proj.sec", 'null\n', (err) => {
                                if (err) throw err;
                                fs.writeFile(shadowEngineDataDir + "\\engine-data\\run.log", "Nothing To See Here(yet)\r\n;)\r\n", (err) => {
                                    if (err) throw err;
                                    fs.mkdir(shadowEngineDataDir + "\\plugins", (err) => {
                                        if (err) throw err;
                                        fs.mkdir(shadowEngineDataDir + "\\plugins\\DiscordRPC", (err) => {
                                            if (err) throw err;
                                            fs.mkdir(shadowEngineDataDir + "\\plugins\\DiscordRPC\\transports", (err) => {
                                                if (err) throw err;
                                                fs.copyFile(shadowProgramDir + "\\DiscordRPC\\client.js", shadowEngineDataDir + "\\plugins\\DiscordRPC\\client.js", (err) => {
                                                    if (err) throw err;
                                                    fs.copyFile(shadowProgramDir + "\\DiscordRPC\\constants.js", shadowEngineDataDir + "\\plugins\\DiscordRPC\\constants.js", (err) => {
                                                        if (err) throw err;
                                                        fs.copyFile(shadowProgramDir + "\\DiscordRPC\\index.js", shadowEngineDataDir + "\\plugins\\DiscordRPC\\index.js", (err) => {
                                                            if (err) throw err;
                                                            fs.copyFile(shadowProgramDir + "\\DiscordRPC\\util.js", shadowEngineDataDir + "\\plugins\\DiscordRPC\\util.js", (err) => {
                                                                if (err) throw err;
                                                                fs.copyFile(shadowProgramDir + "\\DiscordRPC\\transports\\index.js", shadowEngineDataDir + "\\plugins\\DiscordRPC\\transports\\index.js", (err) => {
                                                                    if (err) throw err;
                                                                    fs.copyFile(shadowProgramDir + "\\DiscordRPC\\transports\\ipc.js", shadowEngineDataDir + "\\plugins\\DiscordRPC\\transports\\ipc.js", (err) => {
                                                                        if (err) throw err;
                                                                        fs.copyFile(shadowProgramDir + "\\DiscordRPC\\transports\\websocket.js", shadowEngineDataDir + "\\plugins\\DiscordRPC\\transports\\websocket.js", (err) => {
                                                                            if (err) throw err;
                                                                            createWindow();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            })
        } else {
            createWindow();
        }
    })
});

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 850,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        },
        maximizable: false,
        resizable: false,
        darkTheme: true,
        alwaysOnTop: true
    });

    mainWindow.loadURL(`file://${__dirname}/dom/project-browser.html`);
    //mainWindow.loadURL(`file://${__dirname}/tests/grid-resize.html`);

    //mainWindow.on("close", function() {
    //    dialog.showMessageBox({
    //        type: 'info',
    //        title: "Quit Confirmation",
    //        message: "Are you sure you want to exit?",
    //        buttons: ["Yes", "No"]
    //    }, (index) => {
    //        if (index === 0)
    //    });
    //});

    mainWindow.on("closed", function() {
        mainWindow = null;
    });

    const windowIconMenu = new Menu();
    //windowIconMenu.append(new MenuItem({ label: "Minimize", click() {mainWindow.minimize()} }));
    //windowIconMenu.append(new MenuItem({ label: "Maximize", click() {mainWindow.maximize()} }));
    //windowIconMenu.append(new MenuItem({ type: "separator" }));
    windowIconMenu.append(new MenuItem({ label: "Close", accelerator: "Alt+F4", click() {app.quit()} }));

    ipcMain.on("window-icon-context", function(event) {
        const win = BrowserWindow.fromWebContents(event.sender);
        windowIconMenu.popup(win);
    });

    ipcMain.on("confirm-delete-proj-msg", (event, project) => {

        var confirm = dialog.showMessageBoxSync(mainWindow, {
            type: "warning",
            title: "Confirm Project Deletion",
            message: "Are you sure you want to delete " + project + "?",
            buttons: ["Yes", "No"]
        });

        event.sender.send("response-confirm-delete-proj-msg", confirm, project);
    });

    ipcMain.on("editor-resized", (event) => {});

    mainWindow.setOverlayIcon("media/img/icons/!.png", "Shadow Engine attention");
    mainWindow.setThumbnailClip({
        x: 0,
        y: 29,
        height: mainWindow.getBounds().height - 29,
        width: mainWindow.getBounds().width
    });

    if (devEnabled) {
        globalShortcut.register("CmdOrCtrl+Shift+Alt+K", () => {
            showLog.showLog(__dirname + "\\dumb.log");
        });
    }
}

app.on("will-quit", function() {
    fs.writeFileSync(shadowEngineDataDir + "\\engine-data\\proj.sec", "null\n", "utf-8");
});

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function() {
    if (mainWindow === null) {
        createWindow();
    }
});

app.setAsDefaultProtocolClient("shadowengine");