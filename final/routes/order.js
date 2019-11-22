const express = require("express");
const router = express.Router();
const data = require("../data");
const tabs = data.tabs;
const users = data.users;
const head = require("./head");
const authentication = require("./authentication");
const xss = require('xss');
const ObjectID = require('mongodb').ObjectID;

router.get("/:id", async (req, res) => {
    const Head = await head(req);
    const tabid = xss(req.params.id);
    try {
        const data = await tabs.getId(tabid);
        console.log(2);
        res.render("construct/order", {title: "Order " + data[0]["tabName"], status: Head});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
})

module.exports = router;