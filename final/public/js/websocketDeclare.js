var origin = window.location.hostname;
var ws = new WebSocket('ws://' + origin + ':8080');
ws.onopen = function() {
    console.log("conection open");
}