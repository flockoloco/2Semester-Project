const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminR = require('./AllAboard/Admin');

const mysql = require('mysql');

//CODE FOR CONNECTION TO DATABASE
const dbase = mysql.createConnection({
    host:"localhost",
    port:"8889",
    user:"root",
    password:"Project100",
    database:"All_Aboard",
    });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('libraries'));
app.use(express.static('AllAboard'));
app.use(express.static('addons'));
app.use(express.static('public'));

app.use(adminR.routes);

app.use((req, res, next) => {res.status(404).sendFile(path.join(__dirname, 'view', '404.html'))});

app.listen(3000);