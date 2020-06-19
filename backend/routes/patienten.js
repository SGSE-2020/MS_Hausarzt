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
                response = undefined
                patienten_all = {
                    "patienten": []
                }
                for (var elem of result[0]["patienten"]) {
                    delete elem["patientenakte"]
                    patienten_all["patienten"].push(elem)
                }
                response = patienten_all

                if (response) {
                    res.json(response)
                } else {
                    res.status(404).send({'error': 'Patients not found'})
                }
            } else {
                res.status(404).send({'error': 'Patients not found'})
            }  
        })
    })
})

module.exports = router;