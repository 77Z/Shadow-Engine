module.exports = function(filename) {
    var fileExt = filename.split(".")[filename.split(".").length - 1];

    switch(fileExt) {
        case "js":
            return "js";
        case "cs":
            return "csharp";
        case "java":
            return "java";
        case "rs":
            return "rust";
        case "cpp":
            return "cpp";
        case "c":
            return "c";
        case "h":
            return "header"
        case "class":
            return "java-class";
        case "jar":
            return "jar";
        case "ts":
            return "typescript";
        case "txt":
            return "text";
        case "log":
            return "log";
        case "bat":
            return "batch";
        case "json":
            return "json";
        case "sproject":
            return "sproject";
        case "sec":
            return "sec";
        case "sln":
            return "vs-sln";
        case "csproject":
            return "csproject";
        case "code-workspace":
            return "code-workspace";
        case "png":
            return "png";
        case "jpg":
            return "jpg";
        case "bmp":
            return "bmp";
        case "jpeg":
            return "jpeg";
        case "mp3":
            return "mp3";
        case "wav":
            return "wav";
        case "flac":
            return "flac";
        case "aac":
            return "acc";
        case "ogg":
            return "ogg";
        case "blend":
            return "blend";
        case "blend1":
            return "blend1";
        case "blend2":
            return "blend2";
        case "blend3":
            return "blend3";
        case "obj":
            return "obj";
        case "fbx":
            return "fbx";
        case "gltf":
            return "gltf";
        case "glb":
            return "glb";
        default:
            return "unknown";
    }
}