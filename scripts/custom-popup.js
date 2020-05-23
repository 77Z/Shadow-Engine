const {BrowserWindow} = require("electron").remote;

module.exports = {
    create: function(message) {
        let msgBox = new BrowserWindow({
            height: 200,
            width: 500,
            center: true,
            transparent: true,
            frame: false,
            alwaysOnTop: true,
            minimizable: false,
            maximizable: false,
            darkTheme: true,
            fullscreenable: false,
            resizable: false,
            skipTaskbar: true,
            webPreferences: {
                nodeIntegration: true
            }
        });

        msgBox.loadURL(`file://${__dirname}/../dom/popup.html`);
        msgBox.on("closed", function() {
            msgBox = null;
        });
        msgBox.show();
        msgBox.webContents.on("did-finish-load", function() {
            msgBox.webContents.send("content", message);
        });
    }
}