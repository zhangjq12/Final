const express = require("express");
const router = express.Router();
const data = require("../data");
const tabs = data.tabs;
const users = data.users;
const head = require("./head");
const comments = data.comments;
const authentication = require("./authentication");

router.get("/", async (req, res) => {
    const Head = await head(req);
    const auth = await authentication(req);
    try {
        const data = await tabs.getId(req.query.tabId);
        var likeThis = false;
        var disLike = false;
        if(auth != null) {
            const user = await users.getName(auth);
            for(let x in user[0]["favoriteTabs"]) {
                if(user[0]["favoriteTabs"][x] == req.query.tabId)
                    likeThis = true;
            }
            for(let x in user[0]["dislike"]) {
                if(user[0]["dislike"][x] == req.query.tabId)
                    disLike = true;
            }
        }
        var ifLike = "";
        var ifdisLike = "";
        if(likeThis == true) {
            ifLike = "likefilled.png";
        }
        else
            ifLike = "like.png";
        if(disLike) {
            ifdisLike = "dislikefilled.png";
        }
        else
            ifdisLike = "dislike.png";
        const commentsData = await comments.getTab(req.query.tabId);
        const deleteId = 'deleteTabs("' + req.query.tabId + '");';
        res.render("construct/tabs/show", {title: data[0]["tabName"], status: Head, tab: data[0]["tabName"], id: req.query.tabId, delete: deleteId, song: data[0]["songName"], artist: data[0]["artistName"], author: data[0]["author"], content: data[0]["Content"], thumbsup: data[0]["Rating"]["thumbsup"], thumbsdown: data[0]["Rating"]["thumbsdown"], thumbstatus: ifLike, badstatus: ifdisLike, userName: auth, comments: commentsData});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.get("/newtabs", async (req, res) => {
    const Head = await head(req);
    const auth = await authentication(req);
    if(auth != null)
        res.render("construct/newTabs", {title: "New Tabs", status: Head, operation: "upload", author: auth});
    else
        res.render("construct/index", {title: "Guitar Tabs", status: Head, error: "You should log in first!"});
});

router.get("/modifytabs/:id", async (req, res) => {
    const Head = await head(req);
    const auth = await authentication(req);
    try{
        const data = await tabs.getId(req.params.id);
        const authorname = data[0]["author"];
        if(auth != null && auth == authorname)
            res.render("construct/newTabs", {title: "Modify Tabs", status: Head, operation:"modify", tab: data[0]["tabName"], song: data[0]["songName"], artist: data[0]["artistName"], author: auth, content: data[0]["Content"]});
        else
            res.render("construct/tabs/fail", {title: "Error", status: Head, error: "You don't have permission to modify this tab!"});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!"});
    }
});

router.post("/search", async (req, res) => {
    const Head = await head(req);
    const request = req.body;
    try {
        const name = request["name"];
        const data = await tabs.getName(name);
        if(data.length != 0) 
            res.render("construct/search", {title: "Search result", status: Head, keyWord: name, data: data});
        else
            res.render("construct/search", {title: "Search result", status: Head, error: "Not found"});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.get("/mytabs", async (req, res) => {
    const Head = await head(req);
    const auth = await authentication(req);
    try {
        if(auth != null && auth == req.query.name) {
            const data = await tabs.getAuthor(req.query.name);
            const info = await users.getName(req.query.name);
            const favtabs = [];
            for(var i = 0; i < info[0]["favoriteTabs"].length; i++) {
                var tabdata = await tabs.getId(info[0]["favoriteTabs"][i]);
                var obj = {"_id": tabdata[0]["_id"], "tabName": tabdata[0]["tabName"], "author": tabdata[0]["author"]}
                favtabs.push(obj);
            }
            if(favtabs.length == 0)
                favtabs.push({"_id":"notabs", "tabName": "notabs"});
            res.render("construct/tabs/my", {title: "My Tabs", status: Head, data: data, info: info, favorite: favtabs});
        }
        else
            res.render("construct/tabs/fail", {title: "Error", status: Head, error: "You don't have permission to look his information!"});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.post("/upload", async (req, res) => {
    const Head = await head(req);
    const request = req.body;
    try {
        const result = await tabs.create(request["tabName"], request["songName"], request["artistName"], request["authorName"], request["content"]);
        res.render("construct/tabs/success", {title: "Upload Successfully!", status: Head, operation: "uploaded"});
    }
    catch(e) {
        res.render("construct/tabs/fail", {title: "Upload Failed!", status: Head});
    }
});

router.post("/delete", async (req, res) => {
    const Head = await head(req);
    const request = req.body;
    const auth = await authentication(req);
    try {
        const data = await tabs.getId(request["id"]);
        const authorname = data[0]["author"];
        if(auth != null && auth == authorname) {
            const result = await tabs.remove(request["id"]);
            res.render("construct/tabs/success",  {title: "Delete Successfully!", status: Head, operation: "deleted"});
        }
        else {
            res.render("construct/tabs/fail", {title: "Error", status: Head, error: "You don't have permission to delete this tab!"});
        }
    }
    catch(e) {
        res.render("construct/tabs/fail", {title: "Delete Failed!", status: Head});
    }
});

router.post("/modify", async (req, res) => {
    const Head = await head(req);
    const request = req.body;
    try {
        const data = await tabs.getName(request["tabName"]);
        const res1 = await tabs.modifyArtistName(data[0]["_id"], request["artistName"]);
        const res2 = await tabs.modifyContent(data[0]["_id"], request["content"]);
        const res3 = await tabs.modifySongName(data[0]["_id"], request["songName"]);
        const res4 = await tabs.modifyTabName(data[0]["_id"], request["tabName"]);
        res.render("construct/tabs/success",  {title: "Delete Successfully!", status: Head, operation: "modified"});
    }
    catch(e) {
        res.render("construct/tabs/fail", {title: "Delete Failed!", status: Head});
    }
});

router.post("/like", async (req, res) => {
    const Head = await head(req);
    const request = req.body;
    const auth = await authentication(req);
    try {
        if(auth == null)
            res.render("construct/comments/fail", {title:"Log in first!", status: Head});
        else {
            const op = request["operation"];
            const resultTab = await tabs.rate(request["name"], op);
            const data = await tabs.getName(request["name"]);
            const tabId = data[0]["_id"].toString();
            if(op == "good") {
                const user = await users.liking(auth, tabId);
            }
            else
            if(op == "nogood") {
                const user = await users.unliking(auth, tabId);
            }
        }
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.post("/thumbsdown", async (req, res) => {
    const Head = await head(req);
    const request = req.body;
    const auth = await authentication(req);
    try {
        if(auth == null)
            res.render("construct/comments/fail", {title:"Log in first!", status: Head});
        else {
            const op = request["operation"];
            const resultTab = await tabs.rate(request["name"], op);
            const data = await tabs.getName(request["name"]);
            const tabId = data[0]["_id"].toString();
            if(op == "bad") {
                const user = await users.dislike(auth, tabId);
            }
            else
            if(op == "nobad") {
                const user = await users.undislike(auth, tabId);
            }
        }
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

module.exports = router;
