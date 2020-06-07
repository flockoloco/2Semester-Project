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
        let sql = `SELECT * FROM User WHERE ${field} = ?`;


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
        let sql = `INSERT INTO User(username, password) VALUES (?, ?)`;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
			callback(result.insertId);

			let CastleNO = "INSERT INTO castle(name, posX, posY, player_id) VALUES ('Castle NO', '3', '3', '"+result.insertId+"') ";
			let CastleNE = "INSERT INTO castle(name, posX, posY, player_id) VALUES ('Castle NE', '3', '4', '"+result.insertId+"') ";
			let CastleSO = "INSERT INTO castle(name, posX, posY, player_id) VALUES ('Castle SO', '4', '3', '"+result.insertId+"') ";
            let CastleSE = "INSERT INTO castle(name, posX, posY, player_id) VALUES ('Castle SE', '4', '4', '"+result.insertId+"') ";

            let farmpos1 = "INSERT INTO posicao(posX, posY, player_id, availability) VALUES ('1', '1', '"+result.insertId+"', 1) ";
            let farmpos2 = "INSERT INTO posicao(posX, posY, player_id, availability) VALUES ('1', '2', '"+result.insertId+"', 1) ";
            let farmpos3 = "INSERT INTO posicao(posX, posY, player_id, availability) VALUES ('1', '3', '"+result.insertId+"', 1) ";
            let farmpos4 = "INSERT INTO posicao(posX, posY, player_id, availability) VALUES ('2', '1', '"+result.insertId+"', 1) ";
            let farmpos5 = "INSERT INTO posicao(posX, posY, player_id, availability) VALUES ('2', '2', '"+result.insertId+"', 1) ";
            let farmpos6 = "INSERT INTO posicao(posX, posY, player_id, availability) VALUES ('2', '3', '"+result.insertId+"', 1) ";
            let farmpos7 = "INSERT INTO posicao(posX, posY, player_id, availability) VALUES ('3', '1', '"+result.insertId+"', 1) ";
            let farmpos8 = "INSERT INTO posicao(posX, posY, player_id, availability) VALUES ('3', '2', '"+result.insertId+"', 1) ";

		pool.query(CastleNO, function(err, result) {});
		pool.query(CastleNE, function(err, result) {});
		pool.query(CastleSO, function(err, result) {});
        pool.query(CastleSE, function(err, result) {});

        pool.query(farmpos1, function(err, result) {});
        pool.query(farmpos2, function(err, result) {});
        pool.query(farmpos3, function(err, result) {});
        pool.query(farmpos4, function(err, result) {});
        pool.query(farmpos5, function(err, result) {});
        pool.query(farmpos6, function(err, result) {});
        pool.query(farmpos7, function(err, result) {});
        pool.query(farmpos8, function(err, result) {});
        
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