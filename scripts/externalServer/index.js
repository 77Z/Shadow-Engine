//Global
var shadowEngineDataDir;
if (process.platform == "linux") {
    shadowEngineDataDir = require("os").homedir + "/Shadow Engine";
} else if (process.platform == "win32") {
    shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";
}

const { exec } = require("child_process");
const { writeFile, exists, readFile } = require("fs");

const defaultMimeTypes = [
    {"fx": "*", "mime": "text/plain"},
    {"fx":"html", "mime":"text/html"},
    {"fx":"htm", "mime":"text/html"},
    {"fx":"css", "mime":"text/css"},
    {"fx":"js", "mime":"text/javascript"},
    {"fx":"json", "mime":"application/json"},
    {"fx":"png", "mime":"image/png"},
    {"fx":"jpg", "mime":"image/jpeg"},
    {"fx":"jpeg", "mime":"image/jpeg"},
    {"fx":"ttf", "mime":"font/ttf"},
    {"fx":"txt", "mime":"text/plain"},
];

const mimeTypesFileLoc = shadowEngineDataDir + "\\engine-data\\mimetypes.json";

//Create MIME JSON File if it doesn't exist
function createIfNotExistsMimeFile() {
    exists(mimeTypesFileLoc, (exists, err) => {
        if (err) throw err;
        if (!exists) {
            writeFile(mimeTypesFileLoc, JSON.stringify(defaultMimeTypes, null, 4), "utf-8", (err) => {
                if (err) throw err;
                return true;
            });
        } else { return true; }
    });
    return true;
}

if (createIfNotExistsMimeFile()) { // returns true if succeeded
    readFile(mimeTypesFileLoc, "utf-8", (err, data) => {
        if (err) throw err;
        var parsed = JSON.parse(data);
        var indexCount = 0;
        for (var i = 0; i < parsed.length; i++) {
            if (parsed[i].fx == "*") {
                document.getElementById("mimedefault").value = parsed[i].mime;
            } else {
                var tabledata = document.createElement("tr");
                var tableindex = document.createElement("td");
                tableindex.innerText = indexCount;
                var tablefx = document.createElement("td");
                tablefx.innerText = parsed[i].fx;
                var tablemime = document.createElement("td");
                tablemime.innerText = parsed[i].mime;

                tabledata.appendChild(tableindex); tabledata.appendChild(tablefx); tabledata.appendChild(tablemime);
                document.getElementById("mimetable").appendChild(tabledata);

                indexCount++;
            }
        }
    });
}

document.getElementById("mimeopenconfigbtn").addEventListener("click", function() {
    exec(`"${mimeTypesFileLoc}"`, (error, stdout, stderr) => {
        if (error) throw error;
        if (stderr) throw stderr;
        console.log(stdout);
    });
});