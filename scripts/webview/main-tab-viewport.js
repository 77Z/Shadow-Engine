const THREE = require("../../three/build/three");
//const PointerLockControls = require("../../node_modules/three/examples/jsm/controls/PointerLockControls");
//const { PointerLockControls } = require("../../three/examples/jsm/controls/PointerLockControls"); //import { PointerLockControls } from "../../three/examples/jsm/controls/PointerLockControls";
const JSON5 = require("json5"); // JSON5 for reading things like scene files

const vpContainer = document.getElementById("vp-container");
var activeCamera;
fs.readFile(shadowEngineDataDir + "\\engine-data\\DefaultScene.Scene", "utf-8", (err, data) => {
    if (err) throw err;
    var parsedData = JSON5.parse(data);

    const viewportScene = new THREE.Scene();

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
                var box = new THREE.Mesh(boxGeometry, tempMaterial);
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

    

    const viewportRenderer = new THREE.WebGLRenderer();
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

    function animateViewportFrame() {
        requestAnimationFrame(animateViewportFrame);
        viewportRenderer.render(viewportScene, activeCamera);
    }

    requestAnimationFrame(animateViewportFrame);

    console.log(activeCamera);
});

const robot = require("robotjs");
const { remote } = require("electron");
var mouseisdown = false;

vpContainer.addEventListener("mousedown", function() {
    var editorPosition = remote.getCurrentWindow().getPosition();
    var middleViewportX = Math.round(vpContainer.clientLeft + vpContainer.clientWidth);
    var middleViewportY = Math.round(vpContainer.clientTop + (vpContainer.clientHeight / 2)) + 29; //plus 29 for titlebar because main-tab is an iframe
    console.log(vpContainer.clientWidth / 2);
    mouseisdown = true;
    robot.moveMouse(editorPosition[0] + middleViewportX, editorPosition[1] + middleViewportY);
});

vpContainer.addEventListener("mouseup", function() {
    mouseisdown = false;
});
