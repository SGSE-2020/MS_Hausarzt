var express = require("express");
var router = express.Router();
var mongo_connect = require("../index")

const DB_PATIENTEN = 'patienten'


patienten_all_dummy = {
    "patienten": [{
        "userid": "1",
        "name": "Daniel Whitehall",
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
        "name": "Johann Schmidt",
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
        "name": "Gideon Malick",
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
}

router.get('/setupDB', (req, res) => {
    mongo_connect.mongo_connect(res, (err, db) => {
        db.collection(DB_PATIENTEN).insertOne(patienten_all_dummy, (err, db_res) => {
            if (err) {
                res.status(500).send({'error': err})
            } else {
                res.send()
            }
        })
    })
})


module.exports = router;