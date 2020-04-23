const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static("libraries"));
app.use(express.static("public"));
app.use(express.static("addons"));
