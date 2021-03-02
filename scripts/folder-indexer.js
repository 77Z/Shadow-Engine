const { readdir } = require("fs");

// A function that recursively loops through all directories
// and returns an object
module.exports = function(directory) {
    var returnObject = {};
    
    readdir(directory, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        for (file of files) {
            if (file.isDirectory()) {
                returnObject.folders.push({
                    "name": file.name,
                    "files": ["a"],
                    "folders": ["a"]
                });
            } else {
                returnObject.files.push(file.name);
            }
        }

        console.log(returnObject);
        return returnObject;
    });
};