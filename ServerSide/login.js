const express = require('express');
const path = require('path');

const connection = require('../database/database');

const app = express();

app.get('/Credits', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'View', 'Credits.html'));
});

app.get('/AllAboard', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'View', 'index.html'));
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '..', 'view', 'login.html'));
});

//login authentication
app.post('/', function(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		connection.query('SELECT * FROM all_aboard.player WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				res.redirect('/AllAboard/:id');
			} else {
				res.send('Incorrect Username and/or Password!');
			}		
		});
	} 
});

module.exports = app;