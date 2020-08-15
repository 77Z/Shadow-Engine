var editor = ace.edit("editor");
editor.setTheme("ace/theme/solarized_dark");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});