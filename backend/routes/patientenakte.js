var express = require("express");
var router = express.Router();

patientenakte_dummy = [{
    "userid": "1",
    "patientenakte": [{
        "patientenakteid": "1",
        "userid": "1",
        "datum": "07.06.2020",
        "anamnese": "Alles tut mir weh",
        "symptome": "Bauchschmerzen, Gliederschmerzen",
        "diagnose": "Magen Darm Grippe",
        "medikation": "Magen Darm Medizin",
        "psychischkrank": "Nein",
        "sonstiges": "Ansonsten geht es ihm gut"
    }]
},
{
    "userid": "2",
    "patientenakte": [{
        "patientenakteid": "2",
        "userid": "2",
        "datum": "04.06.2020",
        "anamnese": "Alles tut mir weh",
        "symptome": "Husten, Schnupfen",
        "diagnose": "Erkältung",
        "medikation": "Erkältungs Medizin",
        "psychischkrank": "Nein",
        "sonstiges": "Ansonsten geht es ihm gut"
    },
    {
        "patientenakteid": "4",
        "userid": "2",
        "datum": "05.06.2020",
        "anamnese": "Alles tut mir weh, aber mehr als vorher",
        "symptome": "Corona Symptome",
        "diagnose": "Corona",
        "medikation": "Corona Medizin",
        "psychischkrank": "Nein",
        "sonstiges": "Aufpassen Ansteckungsgefahr"
    }]
},
{
    "userid": "3",
    "patientenakte": [{
        "patientenakteid": "3",
        "userid": "3",
        "datum": "28.05.2020",
        "anamnese": "Alles tut mir weh",
        "symptome": "Corona Symptome",
        "diagnose": "Corona",
        "medikation": "Corona Medizin",
        "psychischkrank": "Nein",
        "sonstiges": "Aufpassen Ansteckungsgefahr"
    }]
}]

//router.get('/patientenakte/:id', function (req, res) {
//    response = patientenakte_dummy[req.params.id-1];
//    //res.set("Access-Control-Allow-Origin", "*");
//    //res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); 
//    //res.set('Access-Control-Allow-Credentials', true);
//    res.set('Content-Type', 'application/json');
//    res.status(200);
//    res.json(response);
//})

router.get('/patientenakte/:id', function(req, res, next) {
    response = patientenakte_dummy[req.params.id-1];
    res.json(response);
});
module.exports = router;