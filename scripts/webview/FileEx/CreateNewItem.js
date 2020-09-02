var layer1 = {
    createScript: function() {
        document.getElementById("layer-1").remove();
        var ul = document.createElement("ul");
        ul.innerHTML = " \
        <li>C++</li> \
        <li>C#</li> \
        <li>Javascript</li> \
        <li>Rust</li> \
        <li>Java</li> \
        ";
        document.getElementById("container").appendChild(ul);
    },
    createWindow: function() {
        document.getElementById("layer-1").remove();
        var ul = document.createElement("ul");
        ul.innerHTML = " \
        <span>Standalone Window</span> \
        <li>Windows API (C++, Rust)</li> \
        <li>WinForms (C#, C++)</li> \
        <li>OpenGL (C++)</li> \
        <li>RayLib (C++, Javascript)</li> \
        <span>Shadow Windows</span> \
        <li>Shadow Window</li> \
        <li>Shadow SubWindow</li> \
        ";
        document.getElementById("container").appendChild(ul);
    },
    createModel: function() {
        document.getElementById("layer-1").remove();
        var ul = document.createElement("ul");
        ul.innerHTML = "<li>Blender Model</li>"
        document.getElementById("container").appendChild(ul);
    },
    createAudio: function() {
        document.getElementById("layer-1").remove();
        var ul = document.createElement("ul");
        ul.innerHTML = "\
        <li>Audacity Track</li>\
        <li>Microphone Sample</li>\
        ";
        document.getElementById("container").appendChild(ul);
    }
}