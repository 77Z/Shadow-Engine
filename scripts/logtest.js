const fs = require("fs");
const logs = require("../scripts/showLog");
var filename = "shadowlograndom" + Math.random().toString().split(".")[1] + ".log";

document.getElementById("logtest").addEventListener("click", function() {
    fs.writeFile(require("os").homedir() + "\\AppData\\Local\\Temp\\" + filename, "lalala wee\r\nThis is a test log with the filename: " + filename, "utf-8", (err) => {
        if (err) throw err;
        logs.showLog(require("os").homedir() + "\\AppData\\Local\\Temp\\" + filename);
    });
});
