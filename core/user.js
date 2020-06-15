const pool = require('./database');
const bcrypt = require('bcrypt');
const { YEAR } = require('mysql2/lib/constants/types');

function User() {};

User.prototype = {
    // Find the user data by id or username.
    find : function(user = null, callback)
    {
        // if the user variable is defind
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'UserID' : 'UserName';
        }
        // prepare the sql query
        let sql = `SELECT * FROM user WHERE ${field} = ?`;


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
    create : function(body, callback){
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
        let userSql = `INSERT INTO user(UserName, UserPassword) VALUES (?, ?)`;
        
        // call the query give it the sql string and the values (bind array)
        pool.query(userSql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);

            let player = "INSERT INTO player(UserID_FK_Player, Concluded, Wheat, Swords, Gold, Faith, Score) VALUES('"+result.insertId+"', FALSE, '50', '50', '50', '50', 0); "
        
            
            pool.query(player, function() {

                let Q1 = "insert into belivers.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values('"+result.insertId+"',false,'1');";
                let Q2 = "insert into belivers.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values('"+result.insertId+"',false,'2');";
                let Q3 = "insert into belivers.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values('"+result.insertId+"',false,'3');";

                let CastleNO = "INSERT INTO belivers.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('Castle', '3', '3', '"+result.insertId+"') ";
                let CastleNE = "INSERT INTO belivers.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('Castle', '3', '4', '"+result.insertId+"') ";
                let CastleSO = "INSERT INTO belivers.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('Castle', '4', '3', '"+result.insertId+"') ";
                let CastleSE = "INSERT INTO belivers.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('Castle', '4', '4', '"+result.insertId+"') ";

                let farmpos1 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '1', '1', '"+result.insertId+"') ";
                let farmpos2 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '1', '2', '"+result.insertId+"') ";
                let farmpos3 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '1', '3', '"+result.insertId+"') ";
                let farmpos4 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '2', '1', '"+result.insertId+"') ";
                let farmpos5 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '2', '2', '"+result.insertId+"') ";
                let farmpos6 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '2', '3', '"+result.insertId+"') ";
                let farmpos7 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '3', '1', '"+result.insertId+"') ";
                let farmpos8 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '3', '2', '"+result.insertId+"') ";

                let barrack1 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '1', '4', '"+result.insertId+"') ";
                let barrack2 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '1', '5', '"+result.insertId+"') ";
                let barrack3 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '1', '6', '"+result.insertId+"') ";
                let barrack4 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '2', '4', '"+result.insertId+"') ";
                let barrack5 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '2', '5', '"+result.insertId+"') ";
                let barrack6 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '2', '6', '"+result.insertId+"') ";
                let barrack7 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '3', '5', '"+result.insertId+"') ";
                let barrack8 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '3', '6', '"+result.insertId+"') ";

                let bank1 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '4', '1', '"+result.insertId+"') ";
                let bank2 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '4', '2', '"+result.insertId+"') ";
                let bank3 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '5', '1', '"+result.insertId+"') ";
                let bank4 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '5', '2', '"+result.insertId+"') ";
                let bank5 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '5', '3', '"+result.insertId+"') ";
                let bank6 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '6', '1', '"+result.insertId+"') ";
                let bank7 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '6', '2', '"+result.insertId+"') ";
                let bank8 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '6', '3', '"+result.insertId+"') ";

                let church1 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '4', '5', '"+result.insertId+"') ";
                let church2 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '4', '6', '"+result.insertId+"') ";
                let church3 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '5', '4', '"+result.insertId+"') ";
                let church4 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '5', '5', '"+result.insertId+"') ";
                let church5 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '5', '6', '"+result.insertId+"') ";
                let church6 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '6', '4', '"+result.insertId+"') ";
                let church7 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '6', '5', '"+result.insertId+"') ";
                let church8 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '6', '6', '"+result.insertId+"') ";

                pool.query(Q1, (err, result)=>{
                    if (err) throw err;
                });
                //pool.query(Q1, function() {});
                pool.query(Q2, function() {});
                pool.query(Q3, function() {});
                
                pool.query(CastleNO, function() {});
                pool.query(CastleNE, function() {});
                pool.query(CastleSO, function() {});
                pool.query(CastleSE, function() {});

                pool.query(farmpos1, function() {});
                pool.query(farmpos2, function() {});
                pool.query(farmpos3, function() {});
                pool.query(farmpos4, function() {});
                pool.query(farmpos5, function() {});
                pool.query(farmpos6, function() {});
                pool.query(farmpos7, function() {});
                pool.query(farmpos8, function() {});

                pool.query(barrack1, function() {});
                pool.query(barrack2, function() {});
                pool.query(barrack3, function() {});
                pool.query(barrack4, function() {});
                pool.query(barrack5, function() {});
                pool.query(barrack6, function() {});
                pool.query(barrack7, function() {});
                pool.query(barrack8, function() {});

                pool.query(bank1, function() {});
                pool.query(bank2, function() {});
                pool.query(bank3, function() {});
                pool.query(bank4, function() {});
                pool.query(bank5, function() {});
                pool.query(bank6, function() {});
                pool.query(bank7, function() {});
                pool.query(bank8, function() {});

                pool.query(church1, function() {});
                pool.query(church2, function() {});
                pool.query(church3, function() {});
                pool.query(church4, function() {});
                pool.query(church5, function() {});
                pool.query(church6, function() {});
                pool.query(church7, function() {});
                pool.query(church8, function() {});
    
            })
        });
    },

    login : function(UserName, password, callback)
    {
        // find the user data by his username.
        this.find(UserName, function(user) {
            // if there is a user by this username.
            if(user) {
                // now we check his password.
                if(bcrypt.compareSync(password, user.UserPassword)) {
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