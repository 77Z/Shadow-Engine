/* **************************************************** */
/*                     DISCLAIMER                       */
/*                                                      */
/* This code doesn't work as of yet, try using the      */
/* output of Converter.js in FileTemplates to manually  */
/* create a compiled langPack, it's just JSON           */
/* **************************************************** */



const fs = require("fs");
const homedir = require("os").homedir();
const shadowEngineDataDir = homedir + "\\AppData\\Roaming\\Shadow Engine";
const outputFileName = JSON.parse(fs.readFileSync("./package.json", "utf-8")).version + ".langPack";

var outfile = `const object = {data:[`;
var outfileend = `]}`;

if (process.platform !== "win32") {
    throw new Error("compileLocalizers can only run on Windows at the moment");
}

fs.readdir(shadowEngineDataDir + "\\localization", (err, files) => {
    if (err) throw err;
    for (var i = 0; i < files.length; i++) {
        var localeId = files[i].split(".")[0];

        console.log("Compiling " + localeId);
        var data = fs.readFileSync(shadowEngineDataDir + "\\localization\\" + files[i], "utf-8");
        var linebreaktype = getLineBreakChar(data);
        var lineSplit = [];
        if (linebreaktype == "\r\n") {
            console.log(localeId + " has line ending type CRLF");
            lineSplit = data.split("\r\n");
        } else if (linebreaktype == "\n") {
            console.log(localeId + " has line ending type LF");
            lineSplit = data.split("\n");
        } else { throw new Error("Can not determine the line ending type of: " + localeId); }
        
        outfile += `{id:"${localeId}",locale:\``
        for (var i = 0; i < lineSplit.length; i++) {
            outfile += lineSplit[i] + `\\n`;
        }
        var isComma = true;
        if (files.length - files[i] < 2) {
            isComma = false;
        }
        if (isComma) {
            outfile += `\`},`
        } else {
            outfile += `\`}`
        }
        
    }

    var fulloutfile = outfile + outfileend;
    fs.writeFile("./resources/" + outputFileName, fulloutfile, (err) => {
        if (err) throw err; else { console.log("Done."); }
    });
});


function getLineBreakChar(string) {
    const indexOfLF = string.indexOf('\n', 1);  // No need to check first-character
    if (indexOfLF === -1) {
        if (string.indexOf('\r') !== -1) return '\r';
        return '\n';
    }
    if (string[indexOfLF - 1] === '\r') return '\r\n';
    return '\n';
}