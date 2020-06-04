const cp = require("child_process");

cp.execFile("Shadow Engine Worker.exe");
cp.execFile("C:\\Program Files\\Blender Foundation\\Blender\\blender.exe");
setTimeout(() => {
    cp.exec('cscript.exe "Remove Title.vbs"');
}, 10000);