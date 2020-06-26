var express = require("express");
var router = express.Router();
var mongo_connect = require("../index")

const DB_PATIENTEN = 'patienten'

router.use((req, res, next) => {
    if (req.hostname == 'localhost' || req.hostname == '127.0.0.1') {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    }
    next()
})

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

/// request.body.userid
router.post('/patienten/:id', (req, res) => {
    mongo_connect.mongo_connect(res, (err, db) => {
        db.collection(DB_PATIENTEN).findOne({"userid":req.params.id}, (err, db_res) => {
            if (err) {
                res.status(500).send({'error': err})
            } else {
                if (db_res) {
                    res.send(db_res)
                    akte = {
                        "userid": req.params.id,
                        $push: {
                            "patientenakte": {
                                "userid": req.body.userid,
                                "datum": req.body.datum,
                                "anamnese": req.body.anamnese,
                                "symptome": req.body.symptome,
                                "diagnose": "",
                                "medikation": "",
                                "psychischkrank": "",
                                "sonstiges": req.body.sonstiges
                            }
                        }
                    }
                    mongo_connect.mongo_connect(res, (err, db) => {
                        db.collection(DB_PATIENTEN).update(akte, (err, db_res) => {
                            if (err) {
                                res.status(500).send({'error': err})
                            } else {
                                res.send(akte)
                            }
                        })
                    })
                    
                } else {
                    new_patient = {
                        "userid": req.body.userid,
                        "name": req.body.name,
                        "patientenakte": [{
                            "userid": req.body.userid,
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
