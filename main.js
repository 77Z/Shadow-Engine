//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const defaultProtocolClient = "shadowengine";
const {app, BrowserWindow, ipcMain, Menu, MenuItem, dialog, globalShortcut} = require("electron");
const showLog = require("./scripts/showLog");
const fs = require("fs");
const devEnabled = false;
const shadowProgramDir = require("os").homedir() + "\\AppData\\Local\\Programs\\shadow-engine";
const { openProcessManager } = require("electron-process-manager");
const { v4: uuid4 } = require("uuid");
const startTimestamp = new Date();
const pty = require("node-pty");
const os = require("os");
var shell = os.platform() === "win32" ? "powershell.exe" : "bash";
const isDev = require("electron-is-dev");

const DiscordRPC = require("./DiscordRPC");
var DiscordRPCData = {
    details: "In the Editor",
    startTimestamp,
    largeImageKey: 'shadowengine',
    largeImageText: "Shadow Engine",
    smallImageKey: "shadow-worker",
    smallImageText: "In the Editor"
};

const editorFileMenuTemplate = [
    {
        label: "Window",
        submenu: [
            {
                label: "Reload Window",
                accelerator: "CmdOrCtrl+Shift+Alt+R",
                click() {
                    //BrowserWindow.getFocusedWindow().webContents.reload();
                    app.relaunch();
                    app.quit();
                }
            }
        ]
    },
    {
        label: "Help",
        submenu: [
            {
                label: "Shadow Task Manager",
                accelerator: "CmdOrCtrl+Shift+~",
                click() {
                    openProcessManager();
                }
            },
            {
                label: "Open Developer Tools",
                accelerator: "CmdOrCtrl+Shift+I",
                click() {
                    BrowserWindow.getFocusedWindow().webContents.openDevTools();
                }
            }
        ]
    }
];

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
                                                                            fs.mkdir(shadowEngineDataDir + "\\blob", (err) => {
                                                                                //fs.mkdir(shadowEngineDataDir + "\\blob\\" + uuid4, (err) => {
                                                                                    if (err) throw err;
                                                                                    fs.writeFile(shadowEngineDataDir + "\\engine-data\\config.json", "//This is the Shadow Engine Configuration File\n//Change settings from here :)\n\n{\n    \"defaultProject\": null,\n    //This will change the default dropdown\n    //on the project creation screen\n    \"mostUsedProgrammingLang\": null,\n    \"codeEditor\": {\n        \"colorTheme\": \"solorized_dark\",\n        \"defaultFontSize\": 20\n    }\n}", (err) => {
                                                                                        if (err) throw err;
                                                                                        createWindow();
                                                                                    });
                                                                                //});
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
                });
            })
        } else {
            createWindow();
        }
    })
});

let mainWindow;
let editor;

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
        alwaysOnTop: true,
        icon: "media\\img\\icons\\shadowengine.png"
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

    ipcMain.on("project-browser.createEditor", (event, projectName) => {
        editor = new BrowserWindow({
            height: 900,
            width: 1500,
            minWidth: 1500,
            minHeight: 900,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                nodeIntegrationInSubFrames: true,
                webviewTag: true,
                webgl: true,
                enableBlinkFeatures: true,
                blinkFeatures: "PreciseMemoryInfo"
            },
            backgroundColor: "#222222",
            darkTheme: true,
            title: "Shadow Engine",
            icon: "media\\img\\icons\\shadowengine.png"
        });
        editor.loadURL(`file://${__dirname}/dom/editor.html`);
        editor.on("closed", function () {
            editor = null
        });
        editor.show();
        var ProjectBrowserKilled = false;
        editor.webContents.on("did-finish-load", function () {
            editor.webContents.send("load-proj", projectName);
            if (!ProjectBrowserKilled) {
                event.sender.send("main.project-browser.kill");
                ProjectBrowserKilled = true;
            }
        });
        editor.setThumbnailClip({
            x: 0,
            y: 49,
            width: editor.getBounds().width,
            height: editor.getBounds().height - 49
        });

        const editorMenu = Menu.buildFromTemplate(editorFileMenuTemplate);
        Menu.setApplicationMenu(editorMenu);


        //Create Development Window in the corner
        if (isDev) {
            let devLabel = new BrowserWindow({
                height: 100,
                width: 400,
                frame: false,
                transparent: true,
                movable: false,
                alwaysOnTop: true,
                skipTaskbar: true,
                x: 10,
                y: 0
            });
            devLabel.setIgnoreMouseEvents(true);
            devLabel.loadURL(`file://${__dirname}/dom/development-mode.html`);
            devLabel.on("closed", function() {
                devLabel = null;
            });
            editor.on("close", function() {
                devLabel.close();
            });
        }
        
    });

    ipcMain.on("main-tab.createFolder", function(e, directory) {
        let createFolder;
        createFolder = new BrowserWindow({
            width: 500,
            height: 200,
            frame: false,
            movable: true,
            closable: true,
            minimizable: false,
            maximizable: false,
            resizable: false,
            alwaysOnTop: true,
            backgroundColor: "#222",
            darkTheme: true,
            icon: "media/img/icons/shadowengine.png",
            webPreferences: {
                nodeIntegration: true
            }
        });
        createFolder.loadURL(`file://${__dirname}/dom/webview/FileEx/createFolder.html`);
        createFolder.on("closed", function() {
            createFolder = null;
        });
        createFolder.webContents.on("did-finish-load", function() {
            createFolder.webContents.send("main.directory", directory);
        });
        createFolder.setThumbnailClip({
            x: 0,
            y: 20,
            width: createFolder.getBounds().width,
            height: createFolder.getBounds().height - 20,
        });
    });

    ipcMain.on("main-tab.createFile", function(e, directory) {
        let createFile;
        createFile = new BrowserWindow({
            width: 450,
            height: 800,
            frame: false,
            movable: true,
            closable: true,
            minimizable: false,
            maximizable: false,
            resizable: false,
            alwaysOnTop: true,
            backgroundColor: "#222",
            darkTheme: true,
            icon: "media/img/icons/shadowengine.png",
            webPreferences: {
                nodeIntegration: true
            }
        });
        createFile.loadURL(`file://${__dirname}/dom/webview/FileEx/createNewItem.html`);
        createFile.on("closed", function() {
            createFile = null;
        });
        createFile.webContents.on("did-finish-load", function() {
            createFile.webContents.send("main.directory", directory);
        });
        /* createFile.setThumbnailClip({
            x: 0,
            y: 20,
            width: createFile.getBounds().width,
            height: createFile.getBounds().height - 20,
        }); */
    });

    ipcMain.on("window-icon-context", function(event) {
        const win = BrowserWindow.fromWebContents(event.sender);
        windowIconMenu.popup(win);
    });

    ipcMain.on("reloadExplorer", (e) => {
        editor.webContents.send("main.relay.reloadExplorer");
    });

    ipcMain.on("confirm-delete-proj-msg", (event, project) => {

        var confirm = dialog.showMessageBoxSync(mainWindow, {
            type: "warning",
            title: "Project Deletion",
            message: "Due to an existing bug, you have to manually delete \"" + project + "\" with file explorer, then restart Shadow. You can right click on a project and open with file explorer to see where it is located",
            buttons: ["Ok"]
        });

        /* var confirm = dialog.showMessageBoxSync(mainWindow, {
            type: "warning",
            title: "Confirm Project Deletion",
            message: "Are you sure you want to delete " + project + "?",
            buttons: ["Yes", "No"]
        });

        event.sender.send("response-confirm-delete-proj-msg", confirm, project); */
    });

    ipcMain.on("tab-control-from-tab.createTab", (event, name, URL) => {
        editor.webContents.send("main.relay.createTab", name, URL);
    });

    ipcMain.on("tab-control-from-tab.createCodeEditor", (event, fileName, fileLocation) => {
        editor.webContents.send("main.relay.createCodeEditor", fileName, fileLocation);
    });

    ipcMain.on("editor-resized", (event) => {});

    ipcMain.on("ShadowDiscordRPC.setStatus", (event, data) => {
        DiscordRPCData = data;

        console.log(DiscordRPCData);
        //createDebugDialogBox("external source set discord status to " + JSON.stringify(DiscordRPCData));
    });


    ipcMain.on("terminal.createTerminal", (event) => {
        //FTT = Forward To Terminal
        //editor.webContents.send("FTT", "datahere");

        var ptyProcess = pty.spawn(shell, [], {
            name: "xterm-color",
            cols: 80,
            rows: 13,
            cwd: process.env.HOME,
            env: process.env
        });

        ptyProcess.on("data", function(data) {
            editor.webContents.send("FTT", data);
        });

        ipcMain.on("terminal.keystroke", (event, key) => {
            ptyProcess.write(key);
        });

    });


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

function createDebugDialogBox(message) {
    dialog.showMessageBoxSync(null, {
        type: "warning",
        title: "Shadow Engine Debug Dialog",
        message: message,
        buttons: ["Ok"]
    });
}


const clientId = "740011656817410140";

DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

async function setActivity() {
    if (!rpc || !mainWindow) {
        return;
    }

    rpc.setActivity(DiscordRPCData);
}

rpc.on("ready", () => {
    setActivity();

    setInterval(() => {
        setActivity();
    }, 15e3)
});

rpc.login({ clientId }).catch(console.error);

app.removeAsDefaultProtocolClient(defaultProtocolClient);
app.setAsDefaultProtocolClient(defaultProtocolClient);