const express = require("express");
const router = express.Router();
const data = require("../data");
const comments = data.comments;
const users = data.users;
const head = require("./head");
const xss = require('xss');

/*router.get("/:id", (req, res) => {

});
*/
router.post("/", async (req, res) => {
    const data = {
        commentAuthor: xss(req.body.commentAuthor),
        tabId: xss(req.body.tabId),
        content: xss(req.body.content)
    }
    const Head = await head(req);
    try {
        if(data["commentAuthor"] != "") {
            const userInfo = await users.getName(data["commentAuthor"]);
            const userId = userInfo[0]["_id"].toString();
            const result = await comments.create(data["tabId"], data["commentAuthor"], userId, data["content"]);
            res.render("construct/comments/success", {title: "Post the Comment Successfully!", status: Head, id: data["tabId"], operation: "posted"});
        }
        else
            throw "e";
    }
    catch(e) {
        res.render("construct/comments/fail", {title: "Post the Comment Failed!", status: Head, id: data["tabId"]});
    }
});
/*
router.delete("/:id", (req, res) => {

});*/

module.exports = router;
