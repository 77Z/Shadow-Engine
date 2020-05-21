const {app, BrowserWindow} = require("electron");

function cw() {
    let mw = new BrowserWindow({
        height: 450,
        width: 800,
        frame: true,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
            nodeIntegrationInWorker: true,
            webgl: true,
            webviewTag: true,
            autoplayPolicy: "no-user-gesture-required"
        },
        alwaysOnTop: false,
        darkTheme: false,
        closable: true,
        minimizable: true,
        maximizable: true,
        backgroundColor: "#000000",
        fullscreen: false,
        movable: true,
        resizable: true,
        skipTaskbar: false,
        title: "null",
    });
    mw.loadURL(`file://${__dirname}/g/index.html`);
    mw.on("closed", function() {
        mw = null;
    });
}

app.on("ready", cw);

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function() {
    if (mw === null) {
        cw();
    }
});