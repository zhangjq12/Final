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

keyFile.push(key);

app.use("/public", express.static(__dirname + "/public"));
app.use("/views", express.static(__dirname + "/views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

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

configRoutes(app);

app.listen(3000, () => {
    console.log("The Server Has Been Connected! Port Is 3000");
});