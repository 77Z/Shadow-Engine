const ipc = require("electron").ipcRenderer;

module.exports = {
    createTab: function(name, URL) {
        ipc.send("tab-control-from-tab.createTab", name, URL);
    }
};