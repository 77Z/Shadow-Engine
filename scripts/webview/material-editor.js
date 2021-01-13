// Im gonna put the code for the node editor in here "temporarily"

// https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = {
            tl: radius,
            tr: radius,
            br: radius,
            bl: radius
        };
    } else {
        var defaultRadius = {
            tl: 0,
            tr: 0,
            br: 0,
            bl: 0
        };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }

}

class NodeEditorEngine {
    constructor(_canvas, _cursorOverlay) {
        this.cursorOverlay = _cursorOverlay;

        this.canvas = _canvas;
        this.ctx = this.canvas.getContext("2d");
        
        this.ctx.font = "20px Montserrat"; //Default Font

        this.grabbing = false;

        this.canvas.width = window.innerWidth; //Adjust width and height of canvas to match window
        this.canvas.height = window.innerHeight;

        this.canvasWidth = this.canvas.clientWidth; // and apply those width and height values to variables for the class to use
        this.canvasHeight = this.canvas.clientHeight;

        this.cameraPosX = 0;
        this.cameraPosY = 0;
        this.cameraMoving = false;

        this.nodes = [];
        this.connections = [];

        this.clearScreen();
    }

    createNode(name, x, y) {
        this.ctx.font = "20px Montserrat";
        this.nodes.push({
            displayName: name,
            x: x,
            y: y,
            width: this.ctx.measureText(name).width + 100,
            height: 200
        });
    }

    drawNodes() {
        for (var i = 0; i < this.nodes.length; i++) {
            this.ctx.font = "20px Montserrat";
            this.ctx.fillStyle = "#f00";
            roundRect(this.ctx, this.nodes[i].x + this.cameraPosX, this.nodes[i].y + this.cameraPosY, this.nodes[i].width, this.nodes[i].height, 3, true, false);
            this.ctx.fillStyle = "#fff";
            this.ctx.fillText(this.nodes[i].displayName, this.nodes[i].x + 5 + this.cameraPosX, this.nodes[i].y + 25 + this.cameraPosY);
        }
    }

    clearScreen() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // 0, 0 marker
        this.ctx.fillStyle = "#fff";
        roundRect(this.ctx, this.cameraPosX, this.cameraPosY, 20, 20, 15, true);

        /* //Grid
        this.ctx.fillStyle = "#fff";
        for (var i = 0; i < this.canvasWidth / this.gridSize; i++) {
            this.ctx.fillRect((this.canvasWidth / this.gridSize) * i, 0, this.gridSize, this.gridSize);
        } */
    }

    drawFrame() {
        //TODO: This needs to be optimized for Shadow Engine's tab system so that it doesn't draw frames when the tab isn't focused

        this.clearScreen();
        this.drawNodes();
    }

    checkNodeCollisons(mousepos) {
        let parentThis = this;
        let hoveredNode = false;
        for (var i = 0; i < this.nodes.length; i++) {
            //simple point to box collison
            var nodeStartX = parentThis.nodes[i].x /* add camera pos */ + parentThis.cameraPosX;
            var nodeStartY = parentThis.nodes[i].y /* add camera pos */ + parentThis.cameraPosY;
            var nodeDeltaX = parentThis.nodes[i].x + parentThis.nodes[i].width /* add camera pos */ + parentThis.cameraPosX;
            var nodeDeltaY = parentThis.nodes[i].y + parentThis.nodes[i].height /* add camera pos */ + parentThis.cameraPosY;

            if (mousepos.x > nodeStartX && mousepos.x < nodeDeltaX /* <- X plane */ && mousepos.y > nodeStartY && mousepos.y < nodeDeltaY /* <- Y plane */) {
                hoveredNode = i;
            }
        }
        return hoveredNode;
    }

    mouseEvents(event) {
        let parentThis = this;

        const me = {};
        me.mousemove = function() {
            //if (parentThis.cursorOverlay == undefined) { throw new Error("cursorOverlay isn't defined"); }

            if (parentThis.cameraMoving) {
                parentThis.cameraPosX = event.clientX;
                parentThis.cameraPosY = event.clientY;
            } else {
                if (parentThis.checkNodeCollisons({ x: event.clientX, y: event.clientY }) !== false) {
                    if (parentThis.grabbing) {

                        var nodeid = parentThis.checkNodeCollisons({ x: event.clientX, y: event.clientY });
                        parentThis.nodes[nodeid].x = event.clientX - (parentThis.nodes[nodeid].width / 2) /* plus camera pos */ - parentThis.cameraPosX;
                        parentThis.nodes[nodeid].y = event.clientY - (parentThis.nodes[nodeid].height / 2) /* plus camera pos */ - parentThis.cameraPosY;

                        parentThis.canvas.style.cursor = "grabbing";
                    } else {
                        parentThis.canvas.style.cursor = "grab";
                    }
                } else {
                    parentThis.canvas.style.cursor = "auto";
                }
            }

            /* parentThis.cursorOverlay.style.top = (event.clientY - 200) + "px";
            parentThis.cursorOverlay.style.left = (event.clientX - 200) + "px"; */
        };
        me.mousedown = function() {
            if (event.preventDefault()) { return; }
            if (event.button == 0) {
                parentThis.grabbing = true;
            } else if (event.button == 2) {
                parentThis.cameraMoving = true;
            }
        };
        me.mouseup = function() {
            if (event.preventDefault()) { return; }
            if (event.button == 0) {
                parentThis.grabbing = false;
            } else if (event.button == 2) {
                parentThis.cameraMoving = false;
            }
        };
        me.resize = function() {
            parentThis.canvas.width = window.innerWidth; //Adjust width and height of canvas to match window
            parentThis.canvas.height = window.innerHeight;

            parentThis.canvasWidth = parentThis.canvas.clientWidth; // and apply those width and height values to variables for the class to use
            parentThis.canvasHeight = parentThis.canvas.clientHeight;
        }
        return me;
    }
}

//Real material editor code

var editor = new NodeEditorEngine(document.getElementById("node-editor"));

editor.createNode("Number Node pooooog", 100, 10);

editor.createNode("NUMBERSSS", 400, 300);

function frame() {
    window.requestAnimationFrame(frame);
    editor.drawFrame();
}

window.requestAnimationFrame(frame);

window.addEventListener("mousemove", (e) => { editor.mouseEvents(e).mousemove(); });
window.addEventListener("mousedown", (e) => { editor.mouseEvents(e).mousedown(); });
window.addEventListener("mouseup", (e) => { editor.mouseEvents(e).mouseup(); });
window.addEventListener("resize", (e) => { editor.mouseEvents(e).resize(); });
window.addEventListener("contextmenu", (e) => { e.preventDefault(); });