const child_process = require("child_process");

if (process.platform == "linux") {
    console.log("running tests for linux");
    child_process.exec("chmod +x ./linuxTests", (error, stdout, stderr) => {
        if (error) throw error;
        console.log(stderr);
        console.log(stdout);
    });
    child_process.exec('./linuxTests', (err, stdout, stderr) => {
        if (err) throw err;
        console.log(stderr);
        console.log(stdout);
    });
} else if (process.platform == "win32") {
    console.log("running tests for win32");
    child_process.exec("ShadowTests.exe", (error, stdout, stderr) => {
        if (error) console.error(error);
        console.log(stdout);
        console.log(stderr);
    });
} else {
    console.log("platform not supported :(");
}