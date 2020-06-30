var express = require("express");
var router = express.Router();
var mongo_connect = require("../index")

const DB_PATIENTEN = 'patienten'


patienten_all_dummy = [{
        "userid": "1",
        "name": "Daniel Whitehall",
        "patientenakte": [{
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
        "name": "Johann Schmidt",
        "patientenakte": [{
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
        "name": "Gideon Malick",
        "patientenakte": [{
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


router.get('/setupDB', (req, res) => {
    mongo_connect.mongo_connect(res, (err, db) => {
        db.collection(DB_PATIENTEN).insertMany(patienten_all_dummy, (err, db_res) => {
            if (err) {
                res.status(500).send({'error': err})
            } else {
                res.send()
            }
        })
    })
})


module.exports = router;