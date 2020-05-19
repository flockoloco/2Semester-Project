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
		if (results.length <= 0) {
			console.log('Já tem settlement!')
		}else{
			connection.query("INSERT INTO `settlement` (`name`,`resource`, `people`, `posX`,`posY`, `player_id`) VALUES ('"+id+"','"+resource+"', '"+people+"', '"+posX+"','"+posY+"','"+playerlogedID+"')", (err, results, fields) => {});
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
		if (results.length <= 0) {
			console.log('Já tem settlement!')
		}else{
			connection.query("INSERT INTO `settlement` (`name`,`resource`, `people`, `posX`,`posY`, `player_id`) VALUES ('"+id+"','"+resource+"', '"+people+"', '"+posX+"','"+posY+"','"+playerlogedID+"')", (err, results, fields) => {});
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
		if (results.length <= 0) {
			console.log('Já tem settlement!')
		}else{
			connection.query("INSERT INTO `settlement` (`name`,`resource`, `people`, `posX`,`posY`, `player_id`) VALUES ('"+id+"','"+resource+"', '"+people+"', '"+posX+"','"+posY+"','"+playerlogedID+"')", (err, results, fields) => {});
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
		if (results.length <= 0) {
			console.log('Já tem settlement!')
		}else{
			connection.query("UPDATE player SET newplayer = false WHERE id = '"+playerlogedID+"' ", (err, results, fields) => {})
			connection.query("INSERT INTO `settlement` (`name`,`resource`, `people`, `posX`,`posY`, `player_id`) VALUES ('"+id+"','"+resource+"', '"+people+"', '"+posX+"','"+posY+"','"+playerlogedID+"')", (err, results, fields) => {});
		}
	})
});

app.post('/decreaseFarm', function(req, res){
	let reduction = req.body.reduction;
	let playerlogedID = req.body.player_id;

	connection.query("UPDATE settlement SET resource = resource-'"+reduction+"' WHERE name = 'Farm' AND player_id = '"+playerlogedID+"' ", (err, results, fields) => {});
});

app.post('/decreaseChurch', function(req, res){
	let reduction = req.body.reduction;
	let playerlogedID = req.body.player_id;

	connection.query("UPDATE settlement SET resource = resource-'"+reduction+"' WHERE name = 'Church' AND player_id = '"+playerlogedID+"' ", (err, results, fields) => {});
});

app.post('/decreaseWar', function(req, res){
	let reduction = req.body.reduction;
	let playerlogedID = req.body.player_id;

	connection.query("UPDATE settlement SET resource = resource-'"+reduction+"' WHERE name = 'War' AND player_id = '"+playerlogedID+"' ", (err, results, fields) => {});
});

app.post('/decreaseHospital', function(req, res){
	let reduction = req.body.reduction;
	let playerlogedID = req.body.player_id;

	connection.query("UPDATE settlement SET resource = resource-'"+reduction+"' WHERE name = 'Hospital' AND player_id = '"+playerlogedID+"' ", (err, results, fields) => {});
});

app.post('/updatePoints', function(req, res){
	let playerlogedID = req.body.player_id;
	let Farm = req.body.Farm;
	let Church = req.body.Church;
	let War = req.body.War;
	let Hospital = req.body.Hospital;

	connection.query("UPDATE player SET populationpoints_total = '"+Farm+"'+'"+Church+"'+'"+War+"'+'"+Hospital+"' WHERE id = '"+playerlogedID+"' ", (err, results, fields) => {});
})

app.post('/increaseFarm', function(req, res){
	let playerlogedID = req.body.player_id;
	let increase = req.body.increase;

	connection.query("UPDATE settlement SET resource = resource+'"+increase+"' WHERE name = 'Farm' AND player_id = '"+playerlogedID+"' ", (err, results, fields) => {});
})

app.post('/increaseChurch', function(req, res){
	let playerlogedID = req.body.player_id;
	let increase = req.body.increase;

	connection.query("UPDATE settlement SET resource = resource+'"+increase+"' WHERE name = 'Church' AND player_id = '"+playerlogedID+"' ", (err, results, fields) => {});
})

app.post('/increaseWar', function(req, res){
	let playerlogedID = req.body.player_id;
	let increase = req.body.increase;

	connection.query("UPDATE settlement SET resource = resource+'"+increase+"' WHERE name = 'War' AND player_id = '"+playerlogedID+"' ", (err, results, fields) => {});
})

app.post('/increaseHospital', function(req, res){
	let playerlogedID = req.body.player_id;
	let increase = req.body.increase;

	connection.query("UPDATE settlement SET resource = resource+'"+increase+"' WHERE name = 'Hospital' AND player_id = '"+playerlogedID+"' ", (err, results, fields) => {});
})

app.post('/updatePeopleFarm', function(req, res){
	let playerlogedID = req.body.player_id;
	let peopleNow = req.body.peopleN;
	let peopleL = req.body.peopleL;

	connection.query("UPDATE settlement SET people = '"+peopleNow+"'-'"+peopleL+"' WHERE name = 'Farm' AND player_id = '"+playerlogedID+"' ", (err, results, fields) => {});
})

app.post('/updatePeopleChurch', function(req, res){
	let playerlogedID = req.body.player_id;
	let peopleNow = req.body.peopleN;
	let peopleL = req.body.peopleL;

	connection.query("UPDATE settlement SET people = '"+peopleNow+"'-'"+peopleL+"' WHERE name = 'Church' AND player_id = '"+playerlogedID+"' ", (err, results, fields) => {});
})

app.post('/updatePeopleWar', function(req, res){
	let playerlogedID = req.body.player_id;
	let peopleNow = req.body.peopleN;
	let peopleL = req.body.peopleL;

	connection.query("UPDATE settlement SET people = '"+peopleNow+"'-'"+peopleL+"' WHERE name = 'War' AND player_id = '"+playerlogedID+"' ", (err, results, fields) => {});
})

app.post('/updatePeopleHospital', function(req, res){
	let playerlogedID = req.body.player_id;
	let peopleNow = req.body.peopleN;
	let peopleL = req.body.peopleL;

	connection.query("UPDATE settlement SET people = '"+peopleNow+"'-'"+peopleL+"' WHERE name = 'Hospital' AND player_id = '"+playerlogedID+"' ", (err, results, fields) => {});
})

app.post('/gameOver', function(req, res) {
    res.send("Game Over boy!")
});

module.exports = app;