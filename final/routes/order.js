const express = require("express");
const router = express.Router();
const data = require("../data");
const tabs = data.tabs;
const users = data.users;
const head = require("./head");
const upload = require("./middleware/multer");
const authentication = require("./authentication");
const xss = require('xss');
const ObjectID = require('mongodb').ObjectID;

router.get("/:id", async (req, res) => {
    const Head = await head(req);
    const tabid = xss(req.params.id);
    try {
        const data = await tabs.getId(tabid);
        res.render("construct/order", {title: "Order " + data[0]["tabName"], status: Head, id: data[0]["_id"], tabName: data[0]["tabName"], descript: data[0]["Descript"], avatar: data[0]["Avatar"]});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
})
router.post("/", async (req, res) => {
    const Head = await head(req);
    const tabid = xss(req.body.id);
    console.log(tabid);
    try {
        const data = await tabs.getId(tabid);
        res.send({size: data[0]["Size"], price: data[0]["Perprice"]});
    }
    catch(e) {
        res.send({error: "error"});
    }
})

module.exports = router;