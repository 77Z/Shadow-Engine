module.exports = {
    "meta": {
        "clearColor": 0x222222  //0xe5e5e5 for lIgHt ThEmE
    },
    "cameras": [
        {
            "id": "camera1",
            "type": "perspective",
            "fov": 75,
            "viewplaneMin": 0.1,
            "viewplaneMax": 1000,
            "location": { "x": 0, "y": 0, "z": 5 },
            "rotation": { "x": 0, "y": 0, "z": 0 }
        },
        {
            "id": "camera2",
            "type": "orthographic",
            "orthoSettings": null, //null means use default settings, otherwise use true and set the below values
            //"left": number,   //Camera frustum left plane
            //"right": number,  //Camera frustum right plane
            //"top": number,    //Camera frustum top plane
            //"bottom": number, //Camera frustum bottom plane
            //"near": 1,        //Camera frustum near plane.
            //"far": 1000       //Camera frustum far plane.
            "location": { "x": 0, "y": 0, "z": 0 },
            "rotation": { "x": 0, "y": 0, "z": 0 }
        }
    ],
    "objects": [
        {
            "id": "object1",
            "type": "box-geometry",
            "boxType":  { "x": 1, "y": 2, "z": 1 },
            "location": { "x": 0, "y": 0, "z": 0 },
            "rotation": { "x": 0.5, "y": 0.5, "z": 0.5 },
            "scale":    { "x": 1, "y": 1, "z": 1 },
            "materialLocation": "#sddr/BasicMaterial.Mat" // #sddr expands to shadowEngineDataDir
        }
    ]
}