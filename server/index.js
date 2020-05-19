const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const Mali = require('mali');

var index = require("./routes/index");
var patientenakte = require("./routes/patientenakte");

// View engine


/* rest Server*/
var app = express();
const port = 3000

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

