const customPop = require("../../scripts/custom-popup");

//customPop.create("Lorem ipsum dolor sit amet. Text");

document.body.onmousedown = function(e) {
    if (e.button == 1) return false;
};

console.log("Middle Mouse Scroll Prevented");

document.getElementById("uri-bar-container").addEventListener("click", function() {
    document.getElementById("uriinput").focus();
});

var fileExUribar = document.getElementById("uriinput");

//fileExUribar.addEventListener("keydown", function() {
//    if (fileExUribar.value.substr(0, 2) !== "//") {
//        fileExUribar.value = "//";
//        customPop.create("Invalid URI");
//    }
//});

document.addEventListener("keydown", (event) => {
    if (event.xdefaultPrevented) { return; }
    var key = event.key || event.keyCode;
    if (key == "Enter") {
        console.log("Hello");
    }
});


////Import 3D tools
////import * as THREE from "../../three";
//const three = require("../../three");
//
////Get the bounding box of the Viewport Container
//var vpContainer = document.getElementById("vp-container");
//var vpcWidth  = vpContainer.clientWidth;
//var vpcHeight = vpContainer.clientHeight;
//
////Create Scene and Camera
//var scene = new THREE.Scene();
//var camera = new THREE.PerspectiveCamera(75, vpcWidth / vpcHeight, 0.1, 1000);
//
////Create the renderer and append it to the Viewport Container
//var renderer = new THREE.WebGLRenderer();
//renderer.setSize(vpcWidth, vpcHeight);
//vpContainer.appendChild(renderer.domElement);
//