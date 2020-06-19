const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const mali = require('mali');
const mongo = require('mongodb');

var index = require("./routes/index");
var patientenakte = require("./routes/patientenakte");
var patienten = require("./routes/patienten");
var krankheitsstatistik = require("./routes/krankheitsstatistik");
var setupdb = require("./routes/setupdb");
var test = require("./routes/test_route");

// mongo

const mongo_client = mongo.MongoClient;

const DB_URL = 'mongodb://localhost'
const DB_HAUSARZT = 'hausarzt'

function mongo_connect(res, callback) {
    mongo_client.connect(DB_URL, (err, db) => {
        if (err) {
            res.status(500).send({'error': 'Unable to connect to database.'})
            console.error(err)
        }
        else {
            callback(err, db.db('ms-hausarzt'))
            db.close()
        }
    })
}

/* rest Server*/
var app = express();
const port = 8080

app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "../client")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", index);
app.use("/api", patientenakte);
app.use("/api", patienten);
app.use("/api", setupdb);
app.use("/api", krankheitsstatistik);
app.use("/", test);

app.use((req, res, next) => {
    if (req.hostname == 'localhost' || req.hostname == '127.0.0.1') {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    }
    next()
})

app.listen(port, function(){
    console.log(`Example app listening at http://localhost:${port}`);
});


/* grpc Server */
const gRpcServer = new mali();
const krankenakteProtoPath = path.resolve(__dirname, 'proto/krankenakte.proto');
const ueberweisungProtoPath = path.resolve(__dirname, 'proto/ueberweisung.proto');
gRpcServer.addService(krankenakteProtoPath, 'KrankenakteService');
gRpcServer.addService(ueberweisungProtoPath, 'UeberweisungService');

function sendUeberweisung (param){
    param.res={
        "status":"200",
        "message":"Hat geklappt"
    }
}

function getKrankenakte (param){
    param.res={
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
    }
}

function updatePatientenakte (param){
    param.res={
        "status":"200",
        "message":"hat geklappt"
    }
}

/*Launch gRPC server*/
gRpcServer.use({sendUeberweisung, updatePatientenakte, getKrankenakte});
gRpcServer.start("0.0.0.0:50051");
console.log("gRPC Server running on port: 50051");

// db stuff 



exports.mongo_connect = mongo_connect
module.exports = app
