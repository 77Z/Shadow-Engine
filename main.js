//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const {app, BrowserWindow, ipcMain, Menu, MenuItem, dialog, globalShortcut} = require("electron");
const showLog = require("./scripts/showLog");
const fs = require("fs");
const discordRpc = require("./scripts/discordRPC");
const devEnabled = false;
const shadowProgramDir = require("os").homedir() + "\\AppData\\Local\\Programs\\shadow-engine";
const { openProcessManager } = require("electron-process-manager");

const editorFileMenuTemplate = [
    {
        label: "Window",
        submenu: [
            {
                label: "Reload Window",
                accelerator: "CmdOrCtrl+r",
                click() {
                    BrowserWindow.getFocusedWindow().webContents.reload();
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
                webgl: true
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
        editor.webContents.on("did-finish-load", function () {
            editor.webContents.send("load-proj", projectName);
            event.sender.send("main.project-browser.kill");
        });
        editor.setThumbnailClip({
            x: 0,
            y: 49,
            width: editor.getBounds().width,
            height: editor.getBounds().height - 49
        });

        const editorMenu = Menu.buildFromTemplate(editorFileMenuTemplate);
        Menu.setApplicationMenu(editorMenu);
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
        createFile.loadURL(`file://${__dirname}/dom/webview/FileEx/createFile.html`);
        createFile.on("closed", function() {
            createFile = null;
        });
        createFile.webContents.on("did-finish-load", function() {
            createFile.webContents.send("main.directory", directory);
        });
        createFile.setThumbnailClip({
            x: 0,
            y: 20,
            width: createFile.getBounds().width,
            height: createFile.getBounds().height - 20,
        });
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