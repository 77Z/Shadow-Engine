//* Note that this is for debugging the external server feature
//* Of Shadow without having to navigate through 20 diffrent menus.

const {app, BrowserWindow} = require("electron");

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 450,
        frame: false,
        backgroundColor: "#222",
        title: "Shadow External Server",
        resizable: false,
        minimizable: false,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/../../dom/externalServer/index.html`);
    mainWindow.on("closed", function() {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

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