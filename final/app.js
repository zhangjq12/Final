const express = require('express');
const app = express();
//const server = require('http').Server(app);
const bodyParser = require("body-parser");
const configRoutes =require("./routes");
const exphbs = require('express-handlebars');
const cookie = require('cookie-parser');
const session = require('express-session');
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 1024});
const keyFile = require("./data/key/key");
const authentication = require("./routes/authentication");
const webSocket = require('ws');
const data = require("./data");
const progress = data.progress;
const https = require('https');
const fs = require('fs');

var wss = new webSocket.Server({port: 8080});
var usersSocket = {};

wss.on('connection', async function connection(ws) {
    //console.log('server: receive connection.');
    ws.on('message', async function incoming(req) {
        var res = req.split("||");
        var sender = "";
        var receiver = "";
        var message = "";
        if(res.length == 2) {
            sender = res[1];
            usersSocket[sender] = Array.from(wss.clients)[Array.from(wss.clients).length - 1];
        }
        else {
            message = res[0];
            receiver = res[2];
            wss.clients.forEach(function each(client) {
                if (client == usersSocket[receiver]) {
                    //console.log(req);
                    client.send(message);
                }
            });
        }
    });

    //ws.send('world');
});

keyFile.push(key);

app.use("/public", express.static(__dirname + "/public"));
app.use("/views", express.static(__dirname + "/views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(cookie('JqZhang'));
app.use(session({
    name: 'user',
    secret: 'JqZhang',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 10 * 1000}
}));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var Logging = async (req, res, next) => {
    const Time = new Date().toUTCString();
    const method = req.method;
    const originalUrl = req.originalUrl;
    var auth = await authentication(req);
    if(auth == null)
        auth = "Guest";
    console.log("[" + Time + "]: " + method + " " + originalUrl + " (" + auth + ")");
    next();
}

app.use(Logging);


configRoutes(app);

https.createServer({
    key: fs.readFileSync('./data/key/server.key'),
    cert: fs.readFileSync('./data/key/server.cert')
}, app).listen(3000, () => {
    console.log("The HTTPS Server Has Been Connected! Port Is 3000");
});
app.listen(3001, () => {
    console.log("The Server Has Been Connected! Port Is 3001");
});