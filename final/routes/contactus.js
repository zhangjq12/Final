const express = require("express");
const router = express.Router();
const data = require("../data");
const contactus = data.contactus;
const xss = require('xss');


router.post("/", async (req, res) => {
    const data = {
        name: xss(req.body.name),
        message: xss(req.body.message)
    }
    try {
        const result = await contactus.create(data.name, data.message);
        res.status(200).send({"result": "success"});
            //res.render("construct/comments/success", {title: "Post the Comment Successfully!", status: Head, id: data["tabId"], operation: "posted"});
    }
    catch(e) {
        res.status(403).send({"result": "error"});
        //res.render("construct/comments/fail", {title: "Post the Comment Failed!", status: Head, id: data["tabId"]});
    }
});
/*
router.delete("/:id", (req, res) => {

});*/

module.exports = router;
