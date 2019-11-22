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
    res.render("construct/category", {title: "Categories", status: Head});
})

router.get("/find", async (req, res) => {
    const Head = await head(req);
    try {
        const cate = xss(req.query.category);
        const pagestr = xss(req.query.page);
        const page = parseInt(pagestr);
        const data = await tabs.getArtist(cate);
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
                        <a class="page-link" href="/categories/find?category=' + cate + '&page=' + (page - 1) + '" aria-label="Previous">\
                            <span aria-hidden="true">&laquo;</span>\
                            <span class="sr-only">Previous</span>\
                        </a>\
                    </li>';
                for(var i = 1; i <= pagenum; i++) {
                    if(i == page)
                        pagecontrol += '<li class="page-item active"><a class="page-link" href="/categories/find?category=' + cate + '&page=' + i + '">' + i + '<span class="sr-only">(current)</span></a></li>';
                    else
                        pagecontrol += '<li class="page-item"><a class="page-link" href="/categories/find?category=' + cate + '&page=' + i + '">' + i + '</a></li>';
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
                        <a class="page-link" href="/categories/find?category=' + cate + '&page=' + (page + 1) + '" aria-label="Next">\
                            <span aria-hidden="true">&raquo;</span>\
                            <span class="sr-only">Next</span>\
                        </a>\
                    </li>';
                pagecontrol += '</ul>\
                </nav>';
                res.render("construct/search", {title: "Category " + cate, status: Head, keyWord: cate, data: datapage, pages: pagecontrol});
            }
            else
                res.render("construct/search", {title: "Category " + cate, status: Head, keyWord: cate, error: "Not found a tab"});
        }
        else
            res.render("construct/search", {title: "Category " + cate, status: Head, keyWord: cate, error: "Not found a tab"});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
})

module.exports = router;