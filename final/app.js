const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const configRoutes =require("./routes");
const exphbs = require('express-handlebars');
const cookie = require('cookie-parser');
const session = require('express-session');
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 1024});
const keyFile = require("./data/key/key");
const authentication = require("./routes/authentication");

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

app.listen(3000, () => {
    console.log("The Server Has Been Connected! Port Is 3000");
});