var express = require("express");
var router = express.Router();

krankheitsstatistik_dummy = {
  "Krankheit": [{
    "name": "Corona",
    "Anzahl": 3
  },
  {
    "name": "Erkältung",
    "Anzahl": 6
  },
  {
    "name": "Magen Darm Grippe",
    "Anzahl": 8
  }]
}


//router.get('/krankheitsstatistik', function(req, res, next) {
//    res.send(krankheitsstatistik_dummy);
//});
router.get('/krankheitsstatistik', function (req, res) {
    response = krankheitsstatistik_dummy;
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); 
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Content-Type', 'application/json');
    res.status(200);
    res.json(response);
  })

module.exports = router;