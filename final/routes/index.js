const signin = require("./signIn");
const signup = require("./signUp");
const tabs = require("./tabs");
const head = require("./head");
const logout = require("./logout");
const comments = require("./comments");
const modifyInfo = require("./modifyInfo");
const tab = require("../data/tabs");
const categories = require("./categories");
const order = require("./order");
const location = require("./location");
const auth = require("./authentication");
const users = require("../data/users");
const vendor = require("./vendor");
const exhibitor = require("./exhibitor");
const info = require("./info");


const constructorMethod = app =>{
    app.get("/", async (req, res) => {
        const Head = await head(req);
        try {
            const user = await auth(req);
            if(user == null) {
                res.render('construct/index', {title: "EXHIBITOR", status: Head});
            }
            else {
                var data = await users.getName(user);
                const venderOrNot = data[0]["voe"];
                if(venderOrNot == "vendor") {
                    res.redirect("/vendor");
                }
                else {
                    res.redirect("/exhibitor");
                }
            }
        }
        catch(e) {
            res.render('construct/error', {title: "Error!", status: Head});
        }
    });
    app.use("/signin", signin);
    app.use("/signup", signup);
    app.use("/tabs", tabs);
    app.use("/logout", logout);
    app.use("/comments", comments);
    app.use("/modifyInfo", modifyInfo);
    app.use("/categories", categories);
    app.use("/order", order);
    app.use("/location", location);
    app.use("/exhibitor", exhibitor);
    app.use("/vendor", vendor);
    app.use("/info", info);
    app.get("/popularity", async (req, res) => {
        const Head = await head(req);
        try {
            var data = await tab.getByRating();
            res.render('construct/popularity', {title: "EXHIBITOR", status: Head, data: data});
        }
        catch(e) {
            res.render('construct/error', {title: "Error!", status: Head});
        }
    })

    app.use("*", (req, res) => {
        res.redirect("/");
    });
};

module.exports = constructorMethod;