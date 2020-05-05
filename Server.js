//import packages
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//import folders
const LoginR = require('./ServerSide/login');
const RegisterR = require('./ServerSide/register');

const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('libraries'));
app.use(express.static('database'));
app.use(express.static('addons'));
app.use(express.static('ServerSide'));
app.use(express.static('UserSide'));
app.use(express.static('node_modules'));

app.use(express.static(path.join(__dirname, 'CSS')));

app.use(LoginR);
app.use(RegisterR);

app.use((req, res, next) => {res.status(404).sendFile(path.join(__dirname, 'view', '404.html'))});

app.listen(port);