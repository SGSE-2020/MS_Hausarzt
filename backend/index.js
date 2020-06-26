const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const mali = require('mali');
const mongo = require('mongodb');
const grpc_module = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const cookieParser = require('cookie-parser')

var index = require("./routes/index");
var patientenakte = require("./routes/patientenakte");
var patienten = require("./routes/patienten");
var krankheitsstatistik = require("./routes/krankheitsstatistik");
var setupdb = require("./routes/setupdb");
var test = require("./routes/test_route");

// grpc

const USER_PROTO = path.resolve(__dirname, './proto/user.proto')
const PACKAGE_DEFINITION = protoLoader.loadSync(
    USER_PROTO,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)
const PCKG_DEF_OBJ = grpc_module.loadPackageDefinition(PACKAGE_DEFINITION)
const user_route = PCKG_DEF_OBJ.user


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


app.use(cookieParser())
app.use("/", index);
app.use("/", test);

app.use((req, res, next) => {
    if (req.hostname == 'localhost' || req.hostname == '127.0.0.1') {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    }
    next()
})

app.use('/api', (req, res, next) => {
    if (res.cookies && res.cookies.uid) {
        res.status(400).send({'error': 'uid cookie not allowed'})
    } else {
        if (req.originalUrl.endsWith('/krankheitsstatistik') || req.originalUrl.endsWith('/setupDB') || true==true) {
            next()
        } else {
            user_token = {
                token: req.cookies.token
            }
            console.log(user_token)
            console.log(req.cookies)
            conn = new user_route.UserService('ms-buergerbuero:50051', grpc_module.credentials.createInsecure())
            conn.verifyUser(user_token, (err, feature) => {
                if (err) {
                    res.status(401).send({'error': err})
                } else {
                    if (feature.uid && feature.uid != "") {
                        req.cookies.uid = feature.uid
                        next()
                    } else {
                        res.status(401).send({'error': 'Benutzerverifizierung fehlgeschlagen'})
                    }
                }
            })
        }
    }
})

app.use("/api", patientenakte);
app.use("/api", patienten);
app.use("/api", setupdb);
app.use("/api", krankheitsstatistik);


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
