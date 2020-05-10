const express = require('express');
const path = require('path');

const connection = require('../database/database');

const app = express();

app.get('/Credits', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'View', 'Credits.html'));
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '..', 'view', 'login.html'));
});

//login authentication
app.post('/allaboard', function(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		connection.query('SELECT * FROM player WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				res.redirect('/AllAboard');
			} else {
				res.send('Incorrect Username and/or Password!');
			}		
		});
	} 
});

app.get('/AllAboard', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'View', 'index.html'));
});

app.get('/getPlayer',function(req,res){

	let sql = "SELECT * FROM player order by id desc LIMIT 1";
	
	connection.query(sql, (err,result)=>{
	if(err) throw err;
	
	let playerid = result[0].id;
	
	let sql = "SELECT * FROM Player WHERE id="+playerid;
	
	connection.query(sql, (err,result)=>{
	if(err) throw err;
	res.send(result);
	});});});

app.get("/getAllBuildings/:playerloged", function(req,res){

	let playerlogedID = req.params.playerloged;
	
	let sql = "SELECT * FROM settlement WHERE player_id="+playerlogedID;
	
	connection.query(sql, (err,result)=>{
	if(err) throw err;
	
	res.send(result);
	
	});
	
	});
	
	app.get('/getLastInsertedB', sendLast);
	
	function sendLast(req,res){
	
	let sql = "SELECT * FROM settlement order by id desc LIMIT 1";
	
	connection.query(sql, (err,result)=>{
	if(err) throw err;
	
	console.log(result);
	res.send(result);
	
	});
	
	}
	
	app.post('/createfood/',function (req,res){
	
	let playerlogedID = req.body.player_id;
	let id = req.body.idtype;
	let posX = req.body.posX;
	let posY = req.body.posY;
	let level = 1;
	
	let sql = "INSERT INTO `settlement` (`idtype`,`resourcetype`,`posX`,`posY`,`player_id`) VALUES ('"+id+"','"+level+"','"+posX+"','"+posY+"','"+playerlogedID+"');";
	
	connection.query(sql, (err,result)=>{
	if(err) throw err;
	
	res.send(result);
	
	});
	});

module.exports = app;