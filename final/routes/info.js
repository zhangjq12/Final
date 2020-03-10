const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;
const stars = data.vendorStars;
const head = require("./head");
const authentication = require("./authentication");
const upload = require("./middleware/multer");
const deletefile = require("./delete");
const xss = require('xss');

router.get("/", async (req, res) => {
    const Head = await head(req);
    const auth = await authentication(req);
    const user = req.query.name;
    try {
        if(auth != null){
            const datas = await users.getName(user);
            if(datas[0]["voe"] == "vendor") {
                const id = datas[0]["_id"];
                const ratings = await stars.getId(id);
                var totalRating = 0.0;
                for(var i = 0; i < ratings.length; i++) {
                    totalRating += parseFloat(ratings[i]["stars"]);
                    const exhibitor = await users.getId(ratings[i]["exhibitorId"].toString());
                    ratings[i]["exhibitorName"] = exhibitor[0]["userName"];
                }
                totalRating = totalRating/(ratings.length);
                total = totalRating.toString();
                res.render("construct/user/show", {title: "User Infomation", status: Head, data: datas, comments: ratings, totalRating: total});
            }
            else {
                res.render("construct/user/show", {title: "User Infomation", status: Head, data: datas});
            }
        }
        else
            res.render("construct/error", {title: "Exhibitor", status: Head, error: "You should log in first!"});
    }
    catch(e) {
        res.render("construct/error", {title: "error", status: Head});
    }
});

module.exports = router;