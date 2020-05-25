function _(element) {
    const vq = {}
    vq.edit = function(inp) {
        document.getElementById(element).innerHTML = inp;
    }
    vq.append = function(inp) {
        if (element == "_body") {
            var getinforappend = document.body.innerHTML;
            var newforappend = getinforappend + inp;
            document.body.innerHTML = newforappend;
        } else {
            var getinforappend = document.getElementById(element).innerHTML;
            var newforappend = getinforappend + inp;
            document.getElementById(element).innerHTML = newforappend;
        }
        
    }
    vq.attr = function(attrSelector, attrValue) {
        if (element == "_body") {
            document.body.setAttribute(attrSelector, attrValue);
        } else {
            document.getElementById(element).setAttribute(attrSelector, attrValue);
        }
        
    }
    vq.getInputValue = function() {
        return document.getElementById(element).value;
    }
    vq.getInner = function() {
        var getInnerVar = document.getElementById(element).innerHTML;
        return getInnerVar;
    }
    vq.click = function(clickFunction) {
        document.getElementById(element).addEventListener('click', clickFunction);
    }
    vq.hover = function(hoverFunction) {
        document.getElementById(element).addEventListener('mouseover', hoverFunction);
    }
    vq.hoverOut = function(hoverOutFunction) {
        document.getElementById(element).addEventListener('mouseout', hoverOutFunction);
    }
    vq.dblClick = function(dblClickFunction) {
        document.getElementById(element).addEventListener('dblclick', dblClickFunction);
    }
    vq.keydown = function(keyboardButton, keydownFunction) {
        var obj = document.getElementById(element);
        element.addEventListener("keydown", (event) => {
            if (event.defaultPrevented) {return;}
            var key = event.key || event.keyCode;
            if(key === keyboardButton) {
                keydownFunction();
            }
        });
    }
    vq.keyup = function(keyboardButton, keyupFunction) {
        var obj = document.getElementById(element);
        element.addEventListener("keyup", (event) => {
            if (event.defaultPrevented) {return;}
            var key = event.key || event.keyCode;
            if(key === keyboardButton) {
                keyupFunction();
            }
        });
    }
    vq.pageTitle = function(pageTitleString) {
        document.title = pageTitleString;
    }
    vq.log = function(logMessage) {
        console.log(logMessage);
    }
    vq.warn = function(warnMessage) {
        console.warn(warnMessage);
    }
    vq.error = function(errorMessage) {
        console.error(errorMessage);
    }
    vq.ready = function(readyFunction) {
        window.onload = readyFunction;
    }
    vq.windowClick = function(windowOnClickFunction) {
        window.onclick = windowOnClickFunction;
    }
    vq.delete = function() {
        document.getElementById(element).remove();
    }
    vq.style = function(styleType, styleValue) {
        var getCurrentAttrStyles = document.getElementById(element).getAttribute('style');
        if(getCurrentAttrStyles == null) {
            var appendStyles = styleType + ": " + styleValue + ";";
            document.getElementById(element).setAttribute('style', appendStyles);
        } else {
            var appendStyles = getCurrentAttrStyles + styleType + ": " + styleValue + ";";
            document.getElementById(element).setAttribute('style', appendStyles);
        }
    }
    vq.docLocation = function(URL) {
        document.location.href = URL;
    }
    vq.return = function(valueToReturn) {
        return valueToReturn;
    }
    vq.for = function(loopAmountInt, forFunction) {
        var i;
        for(i = 0; i < loopAmountInt; i++) {
            forFunction();
        }
    }
    vq.empty = function() {
        var getElement = document.getElementById(element)
        while(getElement.firstChild) getElement.removeChild(getElement.firstChild);
    }
    vq.getParent = function() {
        var parent = document.getElementById(element).parentNode;
        return parent;
    }
    vq.getChild = function() {
        if(!document.getElementById(element).hasChildNodes()) {
            console.error = "No child nodes found...";
            throw new Error('No children, use _(elementId).isEmpty() to check if an element has children');
        } else {
            var child = document.getElementById(element).childNodes;
            return child;
        }
    }
    vq.isEmpty = function() {
        if(!document.getElementById(element).hasChildNodes()) {
            return true;
        } else {
            return false;
        }
    }
    vq.nextSibling = function() {
        var nextElement = document.getElementById(element).nextSibling;
        return nextElement;
    }
    vq.math = function() {
        const vqMath = {};
        vqMath.random = function() {
            var randomMathString = Math.random().toString()
            var out = randomMathString.split('.');
            var out2 = out[1];
            var out3 = parseInt(out2);
            return out3;
        }
        return vqMath;
    }
    vq.noop = function() {}
    return vq;
}
var __ = window._;
var _vq = window._;
var _plugin = {
    createCustomVQ: function(vqName) {
        if (vqName == "_" || vqName == "_vq" || vqName == "__") {
            console.log(vqName + " is already registered, no need to to it again");
        } else {
            var node = document.createElement('script');
            var TextNode = document.createTextNode("var " + vqName + " = window._;");
            node.appendChild(TextNode);
            document.head.appendChild(node);
        }
    }
}
