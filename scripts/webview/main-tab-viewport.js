//Global
var shadowEngineDataDir;
if (process.platform == "linux") {
    shadowEngineDataDir = require("os").homedir + "/Shadow Engine";
} else if (process.platform == "win32") {
    shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";
}

const THREE = require("three");
//const PointerLockControls = require("../../node_modules/three/examples/jsm/controls/PointerLockControls");
//const { PointerLockControls } = require("../../three/examples/jsm/controls/PointerLockControls"); //import { PointerLockControls } from "../../three/examples/jsm/controls/PointerLockControls";
const JSON5 = require("json5"); // JSON5 for reading things like scene files
const { FirstPersonControls } = require("../../scripts/engine/FirstPersonControls");
const getProjectName = require("../../scripts/get-project"); // <- Function

const vpContainer = document.getElementById("vp-container");
var activeCamera;
var viewportRenderer;
var viewportScene;
fs.readFile(shadowEngineDataDir + "\\engine-data\\DefaultScene.Scene", "utf-8", (err, data) => {
    if (err) throw err;
    var parsedData = JSON5.parse(data);

    if (parsedData.meta.dimension !== "3D") {
        console.warn("SHADOW3D: WARNING, Can't use type " + parsedData.meta.dimension + " with Shadow3D, continuning");
    }

    viewportScene = new THREE.Scene();

    //! Temporary material, find all references, then REMOVE ME!!
    const tempMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    //Loop through cameras and set the last one to active
    var cameras = [];
    for(var i = 0; i < parsedData.cameras.length; i++) {
        console.log("Created new Cam");
        if (parsedData.cameras[i].type == "perspective") {
            var cam = new THREE.PerspectiveCamera(parsedData.cameras[i].fov, vpContainer.clientWidth / vpContainer.clientHeight, parsedData.cameras[i].viewplaneMin, parsedData.cameras[i].viewplaneMax)
            cam.position.set(parsedData.cameras[i].location.x, parsedData.cameras[i].location.y, parsedData.cameras[i].location.z);
            cam.rotation.set(parsedData.cameras[i].rotation.x, parsedData.cameras[i].rotation.y, parsedData.cameras[i].rotation.z);
            cameras.push(cam);
        } else if (parsedData.cameras[i].type == "orthographic") {
            var cam;
            /* var frustumSize = 600; // default frustum size
            var aspect = vpContainer.clientWidth / vpContainer.clientHeight;  */
            if (parsedData.cameras[i].orthoSettings == null) {
                //Use default ortho camera settings
                var width = 700;
                var height = 600;
                cam = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
            } else {
                cam = new THREE.OrthographicCamera(parsedData.cameras[i].left, parsedData.cameras[i].right, parsedData.cameras[i].top, parsedData.cameras[i].bottom, parsedData.cameras[i].near, parsedData.cameras[i].far);
            }
            cam.position.set(parsedData.cameras[i].location.x, parsedData.cameras[i].location.y, parsedData.cameras[i].location.z);
            cam.rotation.set(parsedData.cameras[i].rotation.x, parsedData.cameras[i].rotation.y, parsedData.cameras[i].rotation.z);
            cameras.push(cam);
        } else { console.error("SHADOW3D: Error, unknown camera type.") };
        
        //Set last camera to active
        activeCamera = cameras[i];
    }
    //const viewportCamera1 = new THREE.PerspectiveCamera(parsedData.cameras[0].fov, vpContainer.clientWidth / vpContainer.clientHeight, 0.1, 1000);

    //Loop through and create objects
    for(var i = 0; i < parsedData.objects.length; i++) {
        console.log("Created new Geo");
        //  Switch statements are better than if else if else,
        //  but for the camera loop above it is probably better to do if else,
        //  because certain cameras are more common than others,
        //  and there arent that many cameras to worry about,
        //  perspective camera is the most popular, therefore it is on the top
        switch(parsedData.objects[i].type) {
            case "box-geometry": {
                var boxGeometry = new THREE.BoxGeometry(parsedData.objects[i].boxType.x, parsedData.objects[i].boxType.y, parsedData.objects[i].boxType.z);

                //Get material location
                var unparsedMatLocation = parsedData.objects[i].materialLocation;
                var parsedMaterial =  parseMaterial(unparsedMatLocation); //finished material to apply to mesh :D

                var box = new THREE.Mesh(boxGeometry, parsedMaterial);
                box.position.set(parsedData.objects[i].location.x, parsedData.objects[i].location.y, parsedData.objects[i].location.z);
                box.rotation.set(parsedData.objects[i].rotation.x, parsedData.objects[i].rotation.y, parsedData.objects[i].rotation.z);
                box.scale.set   (parsedData.objects[i].scale.x   , parsedData.objects[i].scale.y   , parsedData.objects[i].scale.z   );
                viewportScene.add(box);

                break;
            }
            case "sphere-geometry": {

            }
            default: {
                console.error("SHADOW3D: Error, Unknown geometry: " + parsedData.objects[i].type);
                break;
            }
        }
    }

    

    viewportRenderer = new THREE.WebGLRenderer({ antialias: true });
    viewportRenderer.setClearColor(parsedData.meta.clearColor);
    viewportRenderer.setSize(vpContainer.clientWidth, vpContainer.clientHeight);

    vpContainer.appendChild(viewportRenderer.domElement);

    /* const controls = PointerLockControls(activeCamera, viewportRenderer.domElement)
    viewportRenderer.domElement.addEventListener("click", () => {
        controls.lock();
    }); */

    window.onresize = function() {
        activeCamera.aspect = vpContainer.clientWidth / vpContainer.clientHeight;
        activeCamera.updateProjectionMatrix();

        viewportRenderer.setSize(vpContainer.clientWidth, vpContainer.clientHeight);
    };

    requestAnimationFrame(animateViewportFrame);

    console.log(activeCamera);
});

const robot = require("robotjs");
const { remote } = require("electron");
const { MeshBasicMaterial } = require("three"); // I love auto imports :D
const { readFile } = require("fs");
var viewportMouseisdown = false;
var resetMousePosition;

vpContainer.addEventListener("mousedown", function(event) {
    if (event.button == 2) { //Right mouse button down
        viewportMouseisdown = true;
        vpContainer.style.cursor = "none";
        resetMousePosition = robot.getMousePos(); //Get mouse position before we move it to the center, so we can reset it after they let go of the right mouse button
    }
});

vpContainer.addEventListener("mouseup", function(event) {
    if (event.button == 2) { //Right mouse button down
        viewportMouseisdown = false;
        vpContainer.style.cursor = "auto";
        robot.moveMouse(resetMousePosition.x, resetMousePosition.y);
    }
});

vpContainer.addEventListener("mousemove", function() {
    if (viewportMouseisdown) {
        var editorPosition = remote.getCurrentWindow().getPosition();
        var middleViewportX = Math.round(vpContainer.offsetLeft + (vpContainer.clientWidth / 2));
        var middleViewportY = Math.round(vpContainer.offsetTop + (vpContainer.clientHeight / 2)) + 29; //plus 29 for titlebar because main-tab is an iframe
        robot.moveMouse(editorPosition[0] + middleViewportX, editorPosition[1] + middleViewportY);
    }
});

var keydownEvents = {
    w: false,
    a: false,
    s: false,
    d: false,

    h: false
};

document.addEventListener("keydown", (e) => {
    //if (e.preventDefault()) { return; }
    var key = e.key || e.keyCode;
    if (key == "w" && viewportMouseisdown) {
        keydownEvents.w = true;
    } else if (key == "s" && viewportMouseisdown) {
        keydownEvents.s = true;
    }

    if (key == "a" && viewportMouseisdown) {
        keydownEvents.a = true;
    } else if (key == "d" && viewportMouseisdown) {
        keydownEvents.d = true;
    }

    if (key == "h" && viewportMouseisdown) {
        keydownEvents.h = true;
    }
});

document.addEventListener("keyup", (e) => {
    //if (e.preventDefault()) { return; }
    var key = e.key || e.keyCode;
    if (key == "w" && viewportMouseisdown) {
        keydownEvents.w = false;
    } else if (key == "s" && viewportMouseisdown) {
        keydownEvents.s = false;
    }

    if (key == "a" && viewportMouseisdown) {
        keydownEvents.a = false;
    } else if (key == "d" && viewportMouseisdown) {
        keydownEvents.d = false;
    }

    if (key == "h" && viewportMouseisdown) {
        keydownEvents.h = false;
    }
});

var mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateViewportFrame() {
    requestAnimationFrame(animateViewportFrame);
    viewportRenderer.render(viewportScene, activeCamera);


    if (keydownEvents.w) {
        var direction = new THREE.Vector3();
        activeCamera.getWorldDirection(direction);
        activeCamera.position.set(activeCamera.position.x + (direction.x / 5), activeCamera.position.y + (direction.y / 5), activeCamera.position.z + (direction.z / 5));
    } else if (keydownEvents.s) {
        var direction = new THREE.Vector3();
        activeCamera.getWorldDirection(direction);
        activeCamera.position.set(activeCamera.position.x - (direction.x / 5), activeCamera.position.y - (direction.y / 5), activeCamera.position.z - (direction.z / 5));
    }

    if (keydownEvents.a) {
        console.log("a");
        var direction = new THREE.Vector3();
        activeCamera.getWorldDirection(direction);
        activeCamera.position.set(activeCamera.position.x + (direction.x / 5), activeCamera.position.y + (direction.y / 5), activeCamera.position.z + (direction.z / 5));
    } else if (keydownEvents.d) {
        //
    }

    // Below is code that makes the active camera move when you move the mouse,
    // i haven't written it as of writing this, and i looked at other implementations
    // of this same thing in C++, but im not going to be doing those, because those
    // involve PI and math wizardry, sooooo im going to do my "Awesome solution"

    if (keydownEvents.h) {
        activeCamera.rotation.x = 0;
        activeCamera.rotation.y = 0;
        activeCamera.rotation.z = 0;
    }

    if (viewportMouseisdown) {
        //First get the middle of the viewport box on the frame (<- frame refers to the dimensions of the main tab)
        var viewportBoxMiddlePosX = vpContainer.offsetLeft /* <- how far left the vpContainer is from the left of the frame */ + (vpContainer.clientWidth  / 2) /* <- Middle of the box */
        var viewportBoxMiddlePosY = vpContainer.offsetTop  /* <- how far down the vpContainer is from the top  of the frame */ + (vpContainer.clientHeight / 2) /* <- Middle of the box */

        //Then subtract the viewport middle position from the mouse position (on the frame that is) to calculate how much to move the cameras rotation
        var mousePositionX = mouseX;
        var mousePositionY = mouseY;

        //ok for some reason they don't zero out when subtracted,
        //so im gonna do something awful...
        if (viewportBoxMiddlePosY - mousePositionY != 0) {
            viewportBoxMiddlePosY = viewportBoxMiddlePosX - mousePositionY - (viewportBoxMiddlePosY - mousePositionY);
        }

        //activeCamera.rotation.x += (viewportBoxMiddlePosX - mousePositionX) / 100;
        activeCamera.rotation.x += (viewportBoxMiddlePosY - mousePositionY) / 10000;
        console.log(viewportBoxMiddlePosY - mousePositionY);
    }


}


function parseMaterial(materialLocation) {

    var macroDir = ""; //The part of the location string that expands
    var macrolength  = 0; // The length of the macro so it can be cut off later

    switch(materialLocation.charAt(0)) {
        case "#": // # means macro, and it can expand to a certain dir on the system
            switch(materialLocation.substring(1, 5)) { //Nested switch statements woohoo!
                case "home": //refers to the home dir on the system, ex: C:\Users\Owner or on linux: ~ or /home/Owner
                    macroDir = require("os").homedir();
                    macrolength = 5;
                    break;
                case "sddr": //refers to the Shadow Engine Data Directory (C:/Users/Owner/AppData/Roaming/Shadow Engine OR /home/Owner/Shadow Engine)
                    macroDir = shadowEngineDataDir;
                    macrolength = 5;
                    break;
            };
            break;
        case "$": // Set it to nothing because the full directory is shown
            macroDir = "";
            macrolength = 1;
            break;
        case "/":
            macroDir = shadowEngineDataDir + "/projects/" + getProjectName();
            macrolength = 0;
            break;
    };

    var dirAfterMacroRemoval = materialLocation.slice(macrolength); //this is the other half of the directory

    var fulldir = macroDir + dirAfterMacroRemoval;
    readFile(fulldir, "utf-8", (err, data) => {
        if (err) throw err;

        var materialObject = JSON5.parse(data);

        var exportMaterial;
        if (materialObject.meta.materialType == "basic") {
            exportMaterial = new MeshBasicMaterial({
                color: materialObject.basicMaterial.color,
                transparent: materialObject.basicMaterial.transparent,
                opacity: materialObject.basicMaterial.opacity
            });

            console.log(`New Material Initialized
Color: ${materialObject.basicMaterial.color}
transparent: ${materialObject.basicMaterial.transparent}
opacity: ${materialObject.basicMaterial.opacity}`);
        }

        return exportMaterial;
    });
}