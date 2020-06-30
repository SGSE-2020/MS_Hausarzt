var express = require("express");
var router = express.Router();
var mongo_connect = require("../index")
const bodyParser = require('body-parser');

const DB_PATIENTEN = 'patienten'

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }  

router.use((req, res, next) => {
    if (req.hostname == 'localhost' || req.hostname == '127.0.0.1') {
        res.header('Access-Control-Allow-Origin', '*')
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    }
    next()
})

router.use(bodyParser.json());

router.get('/patienten/all', (req, res) => {
    mongo_connect.mongo_connect(res, (err, db) => {
        db.collection(DB_PATIENTEN).find({}).toArray((err, result) => {
            if(result.length > 0) {
                for (var elem of result) {
                    delete elem["patientenakte"]
                }

                if (result) {
                    res.json(result)
                } else {
                    res.status(404).send({'error': 'Patients not found'})
                }
            } else {
                res.status(404).send({'error': 'Patients not found'})
            }  
        })
    })
})

router.get('/removeDB', function(req, res, next) {
    mongo_connect.mongo_connect(res, (err, db) => {
        db.collection(DB_PATIENTEN).remove()
        res.status(200);
    })
});

router.put('/patienten/update', (req, res) => {    
    mongo_connect.mongo_connect(res, (err, db) => {
        db.collection(DB_PATIENTEN).updateOne({ "userid": req.body.userid, "patientenakte.aktenid": req.body.aktenid},
                                            {$set: {
                                                "patientenakte.$.symptome":req.body.symptome,
                                                "patientenakte.$.datum": req.body.datum,
                                                "patientenakte.$.anamnese": req.body.anamnese,
                                                "patientenakte.$.diagnose": req.body.diagnose,
                                                "patientenakte.$.medikation": req.body.medikation,
                                                "patientenakte.$.psychischkrank": req.body.psychischkrank,
                                                "patientenakte.$.sonstiges": req.body.sonstiges
                                            }})
        res.status(200)
    })        
}) 

router.post('/patienten/create', (req, res) => {
    mongo_connect.mongo_connect(res, (err, db) => {
        db.collection(DB_PATIENTEN).findOne({"userid":req.body.userid}, (err, db_res) => {
            if (err) {
                res.status(500).send({'error': err})
            } else {
                if (db_res) {
                    akte = {
                        "aktenid": uuidv4(),
                        "datum": req.body.datum,
                        "anamnese": req.body.anamnese,
                        "symptome": req.body.symptome,
                        "diagnose": "",
                        "medikation": "",
                        "psychischkrank": "",
                        "sonstiges": req.body.sonstiges
                    }
                    
                    mongo_connect.mongo_connect(res, (err, db) => {
                        db.collection(DB_PATIENTEN).updateOne(
                            { userid: req.body.userid},
                            { $addToSet: // $set um zu ändern
                               {
                                 "patientenakte": akte              
                               }
                            }
                         )
                        res.send(akte)
                    })
                    
                } else {
                    new_patient = {
                        "userid": req.body.userid,
                        "name": req.body.name,
                        "patientenakte": [{
                            "aktenid": uuidv4(),
                            "datum": req.body.datum,
                            "anamnese": req.body.anamnese,
                            "symptome": req.body.symptome,
                            "diagnose": "",
                            "medikation": "",
                            "psychischkrank": "",
                            "sonstiges": req.body.sonstiges
                        }]
                    }
                    mongo_connect.mongo_connect(res, (err, db) => {
                        db.collection(DB_PATIENTEN).insertOne(new_patient, (err, db_res) => {
                            console.log(err)
                            if (err) {
                                res.status(500).send({'error': err})
                            } else {
                                res.send(new_patient)
                            }
                        })
                    })
                }
            }
        })
    })
}) 

module.exports = router;
