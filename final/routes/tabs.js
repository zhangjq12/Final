const express = require("express");
const router = express.Router();
const data = require("../data");
const tabs = data.tabs;
const users = data.users;
const head = require("./head");
const comments = data.comments;
const authentication = require("./authentication");
const xss = require('xss');
const ObjectID = require('mongodb').ObjectID;

router.get("/", async (req, res) => {
    const Head = await head(req);
    const auth = await authentication(req);
    const tabId = xss(req.query.tabId);
    try {
        const data = await tabs.getId(tabId);
        var likeThis = false;
        var disLike = false;
        if(auth != null) {
            const user = await users.getName(auth);
            for(let x in user[0]["favoriteTabs"]) {
                if(user[0]["favoriteTabs"][x] == tabId)
                    likeThis = true;
            }
            for(let x in user[0]["dislike"]) {
                if(user[0]["dislike"][x] == tabId)
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
        const commentsData = await comments.getTab(tabId);
        const deleteId = tabId;
        res.render("construct/tabs/show", {title: data[0]["tabName"], status: Head, tab: data[0]["tabName"], id: tabId, delete: deleteId, song: data[0]["songName"], artist: data[0]["artistName"], author: data[0]["author"], content: data[0]["Content"], thumbsup: data[0]["Rating"]["thumbsup"], thumbsdown: data[0]["Rating"]["thumbsdown"], thumbstatus: ifLike, badstatus: ifdisLike, userName: auth, comments: commentsData});
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
    const id = xss(req.params.id);
    try{
        const data = await tabs.getId(id);
        const authorname = data[0]["author"];
        if(auth != null && auth == authorname)
            res.render("construct/newTabs", {title: "Modify Tabs", status: Head, operation: "modify/?tabId=" + id, tab: data[0]["tabName"], song: data[0]["songName"], artist: data[0]["artistName"], author: auth, content: data[0]["Content"]});
        else
            res.render("construct/tabs/fail", {title: "Error", status: Head, error: "You don't have permission to modify this tab!"});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!"});
    }
});

router.post("/search", async (req, res) => {
    const Head = await head(req);
    const name = xss(req.body.name);
    res.redirect("/tabs/search?name=" + name +"&page=1");
    /*try {
        const name = request["name"];
        const data = await tabs.getName(name);
        if(data.length != 0) 
            res.redirect("/tabs/search?name=" + name +"&page=1");
            //res.render("construct/search", {title: "Search result", status: Head, keyWord: name, data: data});
        else
            res.render("construct/search", {title: "Search result", status: Head, error: "Not found a tab"});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }*/
});

router.get("/search", async (req, res) => {
    const Head = await head(req);
    try {
        const name = xss(req.query.name);
        const pagestr = xss(req.query.page);
        const page = parseInt(pagestr);
        const data = await tabs.getName(name);
        if(data.length != 0) {
            const pagenum = Math.floor((data.length - 1) / 10) + 1;
            if(page <= pagenum) {
                const rest = data.length - page * 10;
                var lenpage = 0;
                if(rest > 0) {
                    lenpage = 9;
                }
                else {
                    const temp = data.length - 1;
                    lenpage = temp % 10;
                }
                var datapage = [];
                lenpage = lenpage + (page - 1) * 10;
                for(var i = (page - 1) * 10; i <= lenpage; i++)
                    datapage.push(data[i]);
                var pagecontrol = '<nav aria-label="pages">\
                    <ul class="pagination justify-content-end">';
                if(page == 1)
                    pagecontrol += '<li class="page-item disabled">\
                        <a class="page-link" href="#" aria-label="Previous">\
                            <span aria-hidden="true">&laquo;</span>\
                            <span class="sr-only">Previous</span>\
                        </a>\
                    </li>'
                else
                    pagecontrol += '<li class="page-item">\
                        <a class="page-link" href="/tabs/search?name=' + name + '&page=' + (page - 1) + '" aria-label="Previous">\
                            <span aria-hidden="true">&laquo;</span>\
                            <span class="sr-only">Previous</span>\
                        </a>\
                    </li>';
                for(var i = 1; i <= pagenum; i++) {
                    if(i == page)
                        pagecontrol += '<li class="page-item active"><a class="page-link" href="/tabs/search?name=' + name + '&page=' + i + '">' + i + '<span class="sr-only">(current)</span></a></li>';
                    else
                        pagecontrol += '<li class="page-item"><a class="page-link" href="/tabs/search?name=' + name + '&page=' + i + '">' + i + '</a></li>';
                }
                if(page == pagenum)
                    pagecontrol += '<li class="page-item disabled">\
                        <a class="page-link" href="#" aria-label="Next">\
                            <span aria-hidden="true">&raquo;</span>\
                            <span class="sr-only">Next</span>\
                        </a>\
                    </li>'
                else
                    pagecontrol += '<li class="page-item">\
                        <a class="page-link" href="/tabs/search?name=' + name + '&page=' + (page + 1) + '" aria-label="Next">\
                            <span aria-hidden="true">&raquo;</span>\
                            <span class="sr-only">Next</span>\
                        </a>\
                    </li>';
                pagecontrol += '</ul>\
                </nav>';
                res.render("construct/search", {title: "Search result", status: Head, keyWord: name, data: datapage, pages: pagecontrol});
            }
            else
                res.render("construct/search", {title: "Search result", status: Head, error: "Not found a tab"});
        }
        else
            res.render("construct/search", {title: "Search result", status: Head, error: "Not found a tab"});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.get("/mytabs", async (req, res) => {
    const Head = await head(req);
    const auth = await authentication(req);
    const name = xss(req.query.name);
    try {
        if(auth != null && auth == name) {
            const data = await tabs.getAuthor(name);
            const info = await users.getName(name);
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
            res.render("construct/tabs/fail", {title: "Error", status: Head, error: "You don't have permission to look its information!"});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.post("/upload", async (req, res) => {
    const Head = await head(req);
    const request = {
        tabName: xss(req.body.tabName),
        songName: xss(req.body.songName),
        artistName: xss(req.body.artistName),
        authorName: xss(req.body.authorName),
        content: xss(req.body.content)
    }
    try {
        const result = await tabs.create(request["tabName"], request["songName"], request["artistName"], request["authorName"], request["content"]);
        const data = await tabs.getName(request["tabName"]);
        const id = data[0]["_id"].toString();
        res.send({id: id});
        //res.render("construct/tabs/success", {title: "Upload Successfully!", status: Head, operation: "uploaded"});
    }
    catch(e) {
        res.send("error");
        //res.render("construct/tabs/fail", {title: "Upload Failed!", status: Head});
    }
});

router.post("/delete", async (req, res) => {
    const Head = await head(req);
    const request = {
        id: xss(req.body.id)
    };
    const auth = await authentication(req);
    try {
        const data = await tabs.getId(request["id"]);
        const tab = data[0]["tabName"];
        const authorname = data[0]["author"];
        if(auth != null && auth == authorname) {
            const result = await tabs.remove(request["id"]);
            res.send({"status": "success", "tab": tab, "author": authorname});
            //res.render("construct/tabs/success",  {title: "Delete Successfully!", status: Head, operation: "deleted"});
        }
        else {
            res.send({"status": "nopermission", "tab": tab, "author": authorname});
            //res.render("construct/tabs/fail", {title: "Error", status: Head, error: "You don't have permission to delete this tab!"});
        }
    }
    catch(e) {
        res.send({"status": error});
        //res.render("construct/tabs/fail", {title: "Delete Failed!", status: Head});
    }
});

router.post("/modify", async (req, res) => {
    const Head = await head(req);
    const id = xss(req.query.tabId);
    const request = {
        tabName: xss(req.body.tabName),
        artistName: xss(req.body.artistName),
        content: xss(req.body.content),
        songName: xss(req.body.songName)
    };
    try {
        const ID = new ObjectID(id);
        const res1 = await tabs.modifyArtistName(ID, request["artistName"]);
        const res2 = await tabs.modifyContent(ID, request["content"]);
        const res3 = await tabs.modifySongName(ID, request["songName"]);
        const res4 = await tabs.modifyTabName(ID, request["tabName"]);
        res.send({id: id});
        //res.render("construct/tabs/success",  {title: "Delete Successfully!", status: Head, operation: "modified"});
    }
    catch(e) {
        res.send({id: id});
        //res.render("construct/tabs/fail", {title: "Modify Failed!", status: Head});
    }
});

router.post("/like", async (req, res) => {
    const Head = await head(req);
    const request = {
        operation: xss(req.body.operation),
        name: xss(req.body.name)
    }
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
    const request = {
        operation: xss(req.body.operation),
        name: xss(req.body.name)
    }
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
