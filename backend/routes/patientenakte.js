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

router.get('/patientenakte/:id', (req, res) => {
    mongo_connect.mongo_connect(res, (err, db) => {
        db.collection(DB_PATIENTEN).find({}).toArray((err, result) => {
            if (result.length > 0) {
                response = undefined
                for (var elem of result[0]["patienten"]) {
                    if (elem["userid"] == req.params.id) {
                        response = elem
                    }
                }
                if (response) {
                    res.json(response)
                } else {
                    res.status(404).send({'error': 'Patient with id ' + req.params.id + ' not found'})
                }
            } else {
                res.status(404).send({'error': 'Patient with id ' + req.params.id + ' not found'})
            }
        })
    })
})

module.exports = router;