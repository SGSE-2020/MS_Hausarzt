const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const mali = require('mali');

var index = require("./routes/index");
var patientenakte = require("./routes/patientenakte");

// View engine


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
        "userid": "700",
        "patientenakte": [{
            "patientenakteid": "hans",
            "userid": "hans",
            "datum": "hans",
            "anamnese": "hans",
            "symptome": "hans",
            "diagnose": "hans",
            "medikation": "hans",
            "psychischkrank": "hans",
            "sonstiges": "hans"
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
