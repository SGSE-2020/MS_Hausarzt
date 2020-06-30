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

router.get('/krankheitsstatistik', (req, res) => {
    mongo_connect.mongo_connect(res, (err, db) => {
        db.collection(DB_PATIENTEN).find({}).toArray((err, result) => {
            if (result.length > 0) {
                response = undefined
                krankheitsstatistik = {
                }

                for (var elem of result) {
                    for (var akte of elem["patientenakte"]) {
                        if (akte["diagnose"] in krankheitsstatistik) {
                            krankheitsstatistik[akte["diagnose"]] = krankheitsstatistik[akte["diagnose"]] + 1
                        }
                        else {
                            krankheitsstatistik[akte["diagnose"]] = 1
                        }
                    }
                }

                response = krankheitsstatistik

                if (response) {
                    res.json(response)
                } else {
                    res.status(404).send({'error': 'Krankheitsstatistik not found'})
                }
            } else {
                res.status(404).send({'error': 'Krankheitsstatistik not found'})
            }
        })
    })
})

module.exports = router;