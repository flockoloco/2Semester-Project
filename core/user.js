const pool = require('./database');
const bcrypt = require('bcrypt');

function User() {};

User.prototype = {
    // Find the user data by id or username.
    find : function(user = null, callback)
    {
        // if the user variable is defind
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'username';
        }
        // prepare the sql query
        let sql = `SELECT * FROM users WHERE ${field} = ?`;


        pool.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },

    // This function will insert data into the database. (create a new user)
    // body is an object 
    create : function(body, callback) 
    {

        var pwd = body.password;
        // Hash the password before insert it into the database.
        body.password = bcrypt.hashSync(pwd,10);

        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for(prop in body){
            bind.push(body[prop]);
        }
        // prepare the sql query
        let sql = `INSERT INTO users(username, password) VALUES (?, ?)`;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);
        });
    },

    login : function(username, password, callback)
    {
        // find the user data by his username.
        this.find(username, function(user) {
            // if there is a user by this username.
            if(user) {
                // now we check his password.
                if(bcrypt.compareSync(password, user.password)) {
                    // return his data.
                    callback(user);
                    return;
                }  
            }
            // if the username/password is wrong then return null.
            callback(null);
        });
        
    }

}

module.exports = User;

/*
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

module.exports = app;*/