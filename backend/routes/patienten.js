var express = require("express");
var router = express.Router();

patienten_all_dummy = {
    "patienten": [{
        "userid": "1",
        "name": "Daniel Whitehall"
    },
    {
        "userid": "2",
        "name": "Johann Schmidt"
    },
    {
        "userid": "3",
        "name": "Gideon Malick"
    }]
}

router.get('/patienten/all', function (req, res) {
    response = patienten_all_dummy;
    //res.set("Access-Control-Allow-Origin", "*");
    //res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); 
    //res.set('Access-Control-Allow-Credentials', true);
    res.set('Content-Type', 'application/json');
    res.status(200);
    res.json(response);
  })

module.exports = router;