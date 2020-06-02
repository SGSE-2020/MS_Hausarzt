var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("", ["patientenakte"]);

router.get('/patientenakte', function(req, res, next) {
    res.send('Patienten api');
});

module.exports = router;