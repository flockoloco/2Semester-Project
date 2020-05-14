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

app.get('/AllAboard', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'View', 'index.html'));
});

//login authentication
app.post('/allaboard', function(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		connection.query('SELECT id FROM player WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				res.redirect('/AllAboard');
			} else {
				res.send('Incorrect Username and/or Password!');
			}		
		});
	} 
});

app.get("/getPlayer", function(req,res){

	let sql = "SELECT * FROM player order by id desc LIMIT 1";
		
	connection.query(sql, (err,result)=>{
	if(err) throw err;
		
	let playerid = result[0].id;
		
	let sql = "SELECT * FROM Player WHERE id="+playerid;
		
	connection.query(sql, (err,result)=>{
	if(err) throw err;
	res.send(result);	
	
	});	
	});
});

app.get("/getAllBuildings/:playerLoged", function(req,res){

	let playerlogedID = req.params.playerLoged;
	
	let sql = "SELECT * FROM settlement WHERE player_id="+playerlogedID;
	
	connection.query(sql, (err,result)=>{
	if(err) throw err;
	
	res.send(result);
	
	});
});
	
app.post('/createfazenda/',function (req,res){

	let playerlogedID = req.body.player_id;
	let id = req.body.name;
	let resource = req.body.resource;
	let people = req.body.people;
	let posX = req.body.posX;
	let posY = req.body.posY;


	connection.query("SELECT newplayer FROM player WHERE newplayer = TRUE AND id = ? ", [playerlogedID], function(error, results, fields) {
		if (results.length > 0) {
	connection.query("SELECT * FROM settlement WHERE posX = ? AND posY = ? ", [posX, posY], function(error, results, fields) {
		if (results.length > 0) {
			console.log("Já tem uma insert")
		}else{
			let sql = "INSERT INTO `settlement` (`name`,`resource`, `people`, `posX`,`posY`, `player_id`) VALUES ('"+id+"','"+resource+"', '"+people+"', '"+posX+"','"+posY+"','"+playerlogedID+"');"
			connection.query(sql, (err,result)=>{
				if(err) throw err;
				res.send(result);
			});

		}
	})
}
	})
});

app.post('/createigreja',function (req,res){

	let playerlogedID = req.body.player_id;
	let id = req.body.name;
	let resource = req.body.resource;
	let people = req.body.people;
	let posX = req.body.posX;
	let posY = req.body.posY;


	connection.query("SELECT newplayer FROM player WHERE newplayer = TRUE AND id = ? ", [playerlogedID], function(error, results, fields) {
		if (results.length > 0) {
	connection.query("SELECT * FROM settlement WHERE posX = ? AND posY = ? ", [posX, posY], function(error, results, fields) {
		if (results.length > 0) {
			console.log("Já tem uma insert")
		}else{
			let sql = "INSERT INTO `settlement` (`name`,`resource`, `people`, `posX`,`posY`, `player_id`) VALUES ('"+id+"','"+resource+"', '"+people+"', '"+posX+"','"+posY+"','"+playerlogedID+"');"
			connection.query(sql, (err,result)=>{
				if(err) throw err;
				res.send(result);
			});

		}
	})
}
	})
});

app.post('/createbatalha',function (req,res){

	let playerlogedID = req.body.player_id;
	let id = req.body.name;
	let resource = req.body.resource;
	let people = req.body.people;
	let posX = req.body.posX;
	let posY = req.body.posY;


	connection.query("SELECT newplayer FROM player WHERE newplayer = TRUE AND id = ? ", [playerlogedID], function(error, results, fields) {
		if (results.length > 0) {
	connection.query("SELECT * FROM settlement WHERE posX = ? AND posY = ? ", [posX, posY], function(error, results, fields) {
		if (results.length > 0) {
			console.log("Já tem uma insert")
		}else{
			let sql = "INSERT INTO `settlement` (`name`,`resource`, `people`, `posX`,`posY`, `player_id`) VALUES ('"+id+"','"+resource+"', '"+people+"', '"+posX+"','"+posY+"','"+playerlogedID+"');"
			connection.query(sql, (err,result)=>{
				if(err) throw err;
				res.send(result);
			});

		}
	})
}
	})
});

app.post('/createsaude',function (req,res){

	let playerlogedID = req.body.player_id;
	let id = req.body.name;
	let resource = req.body.resource;
	let people = req.body.people;
	let posX = req.body.posX;
	let posY = req.body.posY;


	connection.query("SELECT newplayer FROM player WHERE newplayer = TRUE AND id = ? ", [playerlogedID], function(error, results, fields) {
		if (results.length > 0) {
	connection.query("SELECT * FROM settlement WHERE posX = ? AND posY = ? ", [posX, posY], function(error, results, fields) {
		if (results.length > 0) {
			console.log("Já tem uma insert")
		}else{
			connection.query("UPDATE player SET newplayer = false WHERE id = '"+playerlogedID+"' ")
			let sql = "INSERT INTO `settlement` (`name`,`resource`, `people`, `posX`,`posY`, `player_id`) VALUES ('"+id+"','"+resource+"', '"+people+"', '"+posX+"','"+posY+"','"+playerlogedID+"');"
			connection.query(sql, (err,result)=>{
				if(err) throw err;
				res.send(result);
			});

		}
	})
}
	})
});


module.exports = app;