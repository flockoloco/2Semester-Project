const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminR = require('./All Aboard/Admin');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminR.routes);

app.use((req, res, next) => {res.status(404).sendFile(path.join(__dirname, 'view', '404.html'))});

app.listen(3000);