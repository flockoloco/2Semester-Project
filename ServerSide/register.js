const express = require('express');
const path = require('path');

const connection = require('../database/database');

const app = express();



app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'view', 'register.html'));
    
});

app.post('/register', function(req, res) {

	const username = req.body.username;
    const password = req.body.password;
    const Repeat_password = req.body.Repeat_password;
    
	if(Repeat_password == password)	{
        connection.query('INSERT INTO player(username,password) VALUES (?, ?)', [username, password], function(error, results, fields) {
        res.redirect('/');
        });
    };
    if(Repeat_password != password){
        res.send('The password dont match!');
    }
});

module.exports = app;