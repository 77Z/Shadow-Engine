const fetch = require("node-fetch");
const request = require("request");
const fs = require("fs-extra");
const colors = require("colors");
const extract = require("extract-zip");
const mv = require("mv");
const childprocess = require("child_process");

//const latestReleaseUrl = "https://api.github.com/repos/77Z/Shadow-Plugins/tags";
const latestReleaseUrl = "https://api.github.com/repos/77Z/Shadow-Dummy/tags";
var   zipballUrl       = "";

log("Getting json from " + latestReleaseUrl);

fetch(latestReleaseUrl)
.then(res => res.json())
.then(out => {
    log("Latest release is " + out[0].name);
    if (process.platform == "win32") {

        // WINDOWS CODE

        zipballUrl = out[0].zipball_url;
        log("Downloading zipball from " + zipballUrl);

        request({
            headers: {
                'User-Agent': '77Z-Shadow-Engine' //For GitHub Support
            },
            uri: zipballUrl
        }).pipe(fs.createWriteStream('ShadowPluginsBuffer.zip'))
        .on('close', function () {
            log('File written');
            try {
                extract("ShadowPluginsBuffer.zip", { dir: __dirname + "\\DeveloperSetup\\" });

                //Now we have to get the folder with the data in it and move all of it out.
                fs.readdir(__dirname + "\\DeveloperSetup\\", (err, items) => {
                    if (err) throw err;
                    for(var i = 0; i < items.length; i++) {
                        if (items[i].split("-")[0] == "77Z") { //Match
                            /* log("Trusting Items...");
                            childprocess.exec(`powershell gci -recurse "${__dirname + "\\DeveloperSetup\\" + items[i]}" | powershell Unblock-File`, (error, stdout, stderr) => {
                                if (error) throw error;
                                if (stderr) throw stderr;
                                console.log(stdout);
                            }) */
                            /* log("Moving items from " + items[i]);
                            fs.move(__dirname + "\\DeveloperSetup\\" + items[i], __dirname + "\\DeveloperSetup\\", (err) => {
                                if (err) throw err;
                                log("Done.");
                            }); */
                            /* mv(__dirname + "\\DeveloperSetup\\" + items[i], __dirname + "\\DeveloperSetup\\", { mkdirp: true }, function(err) {
                                if (err) throw err;
                                log("Done.");
                            }) */

                            var Zfolder = items[i];

                            //We need to move every item inside of the 77Z folder one directory up
                            fs.readdir(__dirname + "\\DeveloperSetup\\" + Zfolder, (err, files) => {
                                if (err) throw err;
                                for (var l = 0; l < files.length; l++) {
                                    fs.move(__dirname + "\\DeveloperSetup\\" + Zfolder + "\\" + files[l], __dirname + "\\DeveloperSetup", (err) => {
                                        if (err) throw err;
                                        log("Moved " + files[l]);
                                    });
                                }
                            })
                        }
                    }
                })

            } catch (err) {
                console.error(err);
            }
        });
    } else if (process.platform == "linux") {

        //LINUX CODE

        zipballUrl = out[0].tarball_url;
        log("Downloading tarball from " + zipballUrl);

        request({
            headers: {
                'User-Agent': '77Z-Shadow-Engine' //For GitHub Support
            },
            uri: zipballUrl
        }).pipe(fs.createWriteStream('ShadowPluginsBuffer.tar.gz'))
        .on('close', function () {
            log('File written');
        });
    } else {
        console.error("Platform not supported :(");
    }
})
.catch(err => { throw err; });

function log(msg) {
    console.log("[installPlugins]".magenta + " " + msg);
}