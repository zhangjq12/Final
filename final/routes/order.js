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

router.get("/:id", async (req, res) => {
    
})

module.exports = router;