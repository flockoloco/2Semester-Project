const pool = require('./database');
const bcrypt = require('bcrypt');

  //random value between 500-600 for each settlement
  var random1 = Math.floor(Math.random() * 100) + 500;
  var random2 = Math.floor(Math.random() * 100) + 500;
  var random3 = Math.floor(Math.random() * 100) + 500;
  var random4 = Math.floor(Math.random() * 100) + 500;
  var random5 = Math.floor(Math.random() * 100) + 500;
  var random6 = Math.floor(Math.random() * 100) + 500;
  var random7 = Math.floor(Math.random() * 100) + 500;
  var random8 = Math.floor(Math.random() * 100) + 500;
  var random9 = Math.floor(Math.random() * 100) + 500;
  var random10 = Math.floor(Math.random() * 100) + 500;
  var random11 = Math.floor(Math.random() * 100) + 500;
  var random12 = Math.floor(Math.random() * 100) + 500;
  var random13 = Math.floor(Math.random() * 100) + 500;
  var random14 = Math.floor(Math.random() * 100) + 500;
  var random15 = Math.floor(Math.random() * 100) + 500;
  var random16 = Math.floor(Math.random() * 100) + 500;

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

			let city1 = "INSERT INTO settlement(name, ore, food, wood, people, posX, posY, player_id) VALUES ('City 1', '"+random1+"', '"+random2+"', '"+random3+"', '"+random4+"', '7', '2', '"+result.insertId+"') ";
			let city2 = "INSERT INTO settlement(name, ore, food, wood, people, posX, posY, player_id) VALUES ('City 2', '"+random5+"', '"+random6+"', '"+random7+"', '"+random8+"', '9', '4', '"+result.insertId+"') ";
			let city3 = "INSERT INTO settlement(name, ore, food, wood, people, posX, posY, player_id) VALUES ('City 3', '"+random9+"', '"+random10+"', '"+random11+"', '"+random12+"', '9', '7', '"+result.insertId+"') ";
            let city4 = "INSERT INTO settlement(name, ore, food, wood, people, posX, posY, player_id) VALUES ('City 4', '"+random13+"', '"+random14+"', '"+random15+"', '"+random16+"', '7', '9', '"+result.insertId+"') ";

		pool.query(city1, function(err, result) {});
		pool.query(city2, function(err, result) {});
		pool.query(city3, function(err, result) {});
        pool.query(city4, function(err, result) {});
        
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