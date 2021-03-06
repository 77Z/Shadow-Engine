const fs = require("fs");
const path = require("path")

module.exports = folderIndexer;

//Adapted from: https://stackoverflow.com/questions/11194287/convert-a-directory-structure-in-the-filesystem-to-json-with-node-js
function folderIndexer(inp) {

    var filename = inp;

    // Sanatize Input Directory String
    //    It took me so long to figure out how to
    //    sanitize the input string without breaking
    //    the recursiveness
    if (inp.substr(-1) == "/" | inp.substr(-1) == "\\") {
        filename = inp.substr(0, inp.length - 1);
    }

    var fileStats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename)
        };

    if (fileStats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return folderIndexer(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else! But like, I never supported symlinks anyways
        info.type = "file";
    }
    //console.log(info);
    return info;
}


// A MONSTER
//    |
//   \/

/* const { readdir } = require("fs");

// A function that recursively loops through all directories
// and returns an object
module.exports = folderIndexer;


function folderIndexer(directory) {
    var returnObject = {};
    
    readdir(directory, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        for (file of files) {
            if (file.isDirectory()) {
                if (returnObject.folders == undefined) { returnObject.folders = []; }
                returnObject.folders.push({
                    "name": file.name,
                    "files": ["a"],
                    "folders": folderIndexer(sanitizeDirectoryString(`${directory}/${file.name}`))
                });
            } else {
                if (returnObject.files == undefined) { returnObject.files = []; }
                returnObject.files.push(file.name);
            }
        }

        //console.log(returnObject);
        console.log(JSON.stringify(returnObject, null, 2));
        return returnObject;
    });
};

function sanitizeDirectoryString(dir) {
    if (dir.substr(-1) == "/" | dir.substr(-1) == "\\") {
        return dir.substr(0, dir.length - 1);
    } else { return dir; }
} */