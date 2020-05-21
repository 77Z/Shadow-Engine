const { remote } = require('electron')
const currentWindow = remote.getCurrentWindow();

document.getElementById('minimize').addEventListener('click', () => {
    remote.getCurrentWindow().minimize()
})

document.getElementById('maximize').addEventListener('click', () => {
    const currentWindow = remote.getCurrentWindow()
    if (currentWindow.isMaximized()) {
        currentWindow.unmaximize()
    } else {
        currentWindow.maximize()
    }
})

function maximizeRenderer() {
    currentWindow.maximize();
}

function unmaximizeRenderer() {
    currentWindow.unmaximize();
}

currentWindow.on('resize', () => {
    var close = document.getElementById('c-nav');
    var maximize = document.getElementById('maximize');
    var minimize = document.getElementById('minimize');
    if (currentWindow.isMaximized()) {

        document.getElementById('top').style.top = "0";
        close.style.height = "26px";
        maximize.style.height = "26px";
        minimize.style.height = "26px";
        
        maximize.innerHTML = "<svg width='10px' height='11px' viewBox='0 0 10 11'><g stroke='none' stroke-width='1' fill='#ffffff' fill-rule='evenodd'><g class='fill'><polygon points='8 8 10 8 10 7 8 7'></polygon><polygon points='2 0 2 3 3 3 3 0'></polygon><polygon points='9 0 9 8 10 8 10 0'></polygon><polygon points='2 1 10 1 10 0 2 0'></polygon><path d='M1,3 L1,9 L7,9 L7,3 L1,3 Z M0,2 L8,2 L8,10 L0,10 L0,2 Z' fill-rule='nonzero'></path></g></g></svg>";
    } else {

        document.getElementById('top').style.top = "3px";
        close.style.height = "29px";
        maximize.style.height = "29px";
        minimize.style.height = "29px";

        maximize.innerHTML = "<svg width='10px' height='11px' viewBox='0 0 10 11'><g stroke='none' stroke-width='1' fill='#ffffff' fill-rule='evenodd'><g fill-rule='nonzero' class='fill'><path d='M1,9 L9,9 L9,1 L1,1 L1,9 Z M0,0 L10,0 L10,10 L0,10 L0,0 Z'></path></g></g></svg>";
    }
})