const fs = require("fs");

module.exports = {
    createConfigFile: function(loc, data) {
        if (typeof loc !== "string") throw new TypeError("loc must be a string!");
        var finalFile = "";
        for(var i = 0; i < data.length; i++) {
            finalFile += data[i] + "\n";
        }
        fs.writeFile(loc, finalFile, 'utf-8', (err)=>{if(err)throw err;});
        return true;
    },
    readConfigFile: function(loc, line) {
        if (typeof loc !== "string") throw new TypeError("loc must be a string!");
        if (typeof line !== "number") throw new TypeError("line must be a number!");
        /* fs.readFile(loc, 'utf-8', (err, data) => {
            if (err) throw err;
            var lines = data.split("\n");
            return lines[line - 1].toString();
        }); */
        var fileRead = fs.readFileSync(loc, 'utf-8');
        var lines = fileRead.split("\n");
        return lines[line - 1].toString();
    }
}