var express = require("express");
var router = express.Router();

router.get('/test', function(req, res, next) {
    res.send('test message');
});

module.exports = router;