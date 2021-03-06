//Global
var shadowEngineDataDir;
if (process.platform == "linux") {
    shadowEngineDataDir = require("os").homedir + "/Shadow Engine";
} else if (process.platform == "win32") {
    shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";
}

const { readdir } = require("fs");
const THREE = require("three");
const getProjectName = require("../../scripts/get-project"); // <- Function
const renderLayer = document.getElementById("render-layer");
const folderIndexer = require("../../scripts/folder-indexer"); // <- Function

const DEFAULT_SHADERS = {
    vertex: `varying vec2 v_uv;

    void main() {
        v_uv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
    frag: `varying vec2 v_uv;
    uniform vec2 u_resolution;
    uniform vec3 u_color;
    uniform float u_time;
    
    void main() {
        gl_FragColor = vec4(vec3(1.0, 0.0, 0.0) * v_uv.x, 1.0);
    }`
};


//Shader Uniforms
const uniforms = {
    u_resolution: { value: { x: null, y: null } },
    u_time: { value: 0.0 },
    u_mouse: { value: { x: null, y: null } },
}
//Clock so shaders know how much time has passed
const clock = new THREE.Clock();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, renderLayer.clientWidth / renderLayer.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(renderLayer.clientWidth, renderLayer.clientHeight);
renderLayer.appendChild(renderer.domElement);

renderLayer.onresize = function() {
    camera.aspect = renderLayer.clientWidth / renderLayer.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(renderLayer.clientWidth, renderLayer.clientHeight);

    //Update Shader Resolution
    if (uniforms.u_resolution !== undefined){
        uniforms.u_resolution.value.x = renderLayer.clientWidth;
        uniforms.u_resolution.value.y = renderLayer.clientHeight;
    }
};

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.ShaderMaterial({
    vertexShader: DEFAULT_SHADERS.vertex,
    fragmentShader: DEFAULT_SHADERS.frag,
    uniforms
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    //Update the shader time uniform
    uniforms.u_time.value = clock.getElapsedTime();

    renderer.render(scene, camera);
}

animate();


function searchProjectForShaders() {
    var projName = getProjectName();
    var projectDirectory = `${shadowEngineDataDir}/projects/${projName}`;

    folderIndexer(projectDirectory);

}

// * Normally this would run on init of the shader-editor frame,
// * But since we are loading in directly from the project browser
// * The project name might not be loaded in yet.
setTimeout(function() {
    searchProjectForShaders();
}, 6000);