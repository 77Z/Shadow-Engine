var tabsContainer = document.getElementById("tabs-container");
var tabsStorage = [];
var tabs = {
    create: function(name, URL) {

        var firstTab = false;
        if (tabsStorage.length == 0) {
            firstTab = true;
        }

        var leftSlam;
        if (tabsStorage.length == 0) {
            leftSlam = "0px";
        } else {
            var leftSlam = (tabsStorage.length) * 200 + "px";
        }
        var id = Math.random().toString().split(".")[1];
        console.log("Tab Number " + tabsStorage.length + 1 + " id set to " + id);
        var tab = document.createElement("div");
        tab.setAttribute("tabPosition", tabsStorage.length + 1);
        if (tabsStorage.length == 0) {
            tab.setAttribute("class", "tab tab-active");
        } else {
            tab.setAttribute("class", "tab");
        }
        tab.setAttribute("id", id);
        tab.style.left = leftSlam;
        var title = document.createElement("span");
        title.setAttribute("class", "tab-title");
        title.appendChild(document.createTextNode(name));
        var closeBtn = document.createElement("button");
        closeBtn.appendChild(document.createTextNode("×"));
        closeBtn.setAttribute("class", "tab-close");


        tab.appendChild(title);
        tab.appendChild(closeBtn);
        tabsContainer.appendChild(tab);

        tabsStorage.push(id);


        //Create Browser Area
        var webView = document.createElement("iframe");
        webView.src = `${__dirname}\\..\\dom\\webview\\${URL}`;
        webView.setAttribute("class", firstTab ? "webView webView-show" : "webView");
        webView.setAttribute("id", "webview" + id);
        webView.setAttribute("frameborder", "0");
        document.getElementById("webviews").appendChild(webView);

        //webView.addEventListener("did-start-loading", function() {
        //    //Show Loading
        //});
        //webView.addEventListener("did-stop-loading", function() {
        //    //Hide Loading
        //});

        closeBtn.addEventListener("click", function() {
            tabs.closeTab(id);
        });
        tab.addEventListener("click", function() {
            tabs.setTabActive(id);
        });
        tab.addEventListener("mousedown", function(e) {
            var startOffsetLeft = tab.offsetLeft;
            var startOffsetRight = tab.offsetLeft + 200;
            var tabRightThreshold = 100;
            var tabLeftThreshold = -100;
            var pos1 = 0, pos2 = 0;
            e = e || window.event;
            e.preventDefault();
            pos2 = e.clientX;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            document.getElementById("webview-cover").style.display = "block";
            
            function elementDrag(e) {
                e = e || window.event;
                pos1 = pos2 - e.clientX;
                pos2 = e.clientX;
                tab.style.left = (tab.offsetLeft - pos1) + "px";
                var offsetRight = tab.offsetLeft + 200;

                if (tab.offsetLeft - startOffsetLeft > tabRightThreshold) {
                    console.log("switch right");
                    console.log(tabs.getTabToRightId());
                }
                if (offsetRight - startOffsetRight < tabLeftThreshold) {
                    console.log("switch Left");
                }

                //console.log(startOffsetRight - offsetRight);
                document.getElementById("debug-num").innerText = startOffsetRight - offsetRight;
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
                document.getElementById("webview-cover").style.display = "none";
                tab.style.transition = "0.2s";
                setTimeout(function() {
                    tab.style.left = leftSlam;
                    setTimeout(function() {
                        tab.style.transition = "0s";
                    }, 10);
                }, 100);
            }
        });
    },
    getTabAmount: function() {
        return tabsStorage.length;
    },
    setTabPosition: function(tabId, pos) {
    },
    moveTab: function(tabId, direction) {
        if (typeof direction !== "string") throw new TypeError("direction must be a string");
        //if (direction !== "left" || direction !== "right") throw new TypeError("direction must be left or right");
        var tab = document.getElementById(tabId);
        console.log("current moving tab position: " + this.getTabPosition(tab));
    },
    getTabPosition: function(tabId) {
        return document.getElementById(tabId).getAttribute("tabposition");
    },
    closeTab: function(tabId) {
        console.log("removing tab " + tabId);
        document.getElementById(tabId).remove;
        for (var i = 0; i < tabsStorage.length; i++) {
            if (tabsStorage[i] == tabId) {
                tabsStorage.splice(i, 1);
                console.log("removed " + i + "from array");
            }
        }
    },
    setTabActive: function(tabId) {
        //Set active tab style
        document.getElementsByClassName("tab-active")[0].classList.remove("tab-active")
        document.getElementById(tabId).classList.add("tab-active");
        
        //Set active webView style
        document.getElementsByClassName("webView-show")[0].classList.remove("webView-show");
        document.getElementById("webview" + tabId).classList.add("webView-show");
    },
    getTabToRightId: function(tabId) {
        return document.getElementById(tabId).nextSibling;
    },
    getTabToLeftId: function(tabId) {
        return document.getElementById(tabId).previousSibling;
    }
};

tabs.create("Main", "main.html");
//tabs.create("Log Test", "logTest.html");
//tabs.create("DuMmY tAb", "dummy.html");