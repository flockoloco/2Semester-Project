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
        let sql = `INSERT INTO user(UserName, UserPassword) VALUES (?, ?)`;
        
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);

            let player = "INSERT INTO player(UserID_FK_Player, Concluded, Wheat, Swords, Gold, Faith, Score) VALUES('"+result.insertId+"', FALSE, '50', '50', '50', '50', 0) "
        
        pool.query(player, function() {});
        setTimeout(function(){
            let A1 = "insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Build a farm!','+20','0','-10','-5')";
            let A2 = "insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Pray for the resources! lmao','-15','0','0','+20')";
            let A3 = "insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Go to war!','-20','-20','+40','+10')";
            let A4 = "insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Stay defensive!','+10','+10','-20','-10')";
            let A5 = "insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Propose trading!','+15','0','+20','-25')";
            let A6 = "insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Side with the priests!','0','0','-10','+10')";
            let A7 = "insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Side with the traders!','0','0','+10','-10')";

            let Q1 = "insert into belivers.Question(PlayerID_FK_Question,Concluded,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question,Answer3ID_FK_Question) values('"+result.insertId+"',false,true,'This years production was really low :( People are hungry but the priests claim god will provide in time of need.','1','2','')";
            let Q2 = "insert into belivers.Question(PlayerID_FK_Question,Concluded,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question,Answer3ID_FK_Question) values('"+result.insertId+"',false,true,'Tension between the kingdoms is rising! You have to decide your stance on the future wars.','3','4','5')";
            let Q3 = "insert into belivers.Question(PlayerID_FK_Question,Concluded,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question,Answer3ID_FK_Question) values('"+result.insertId+"',false,true,'Theres a big fight between the traders and the priests in the court, you need to side with one of them.','6','7','')";

        
            pool.query(A1, function() {});
            pool.query(A2, function() {});
            pool.query(A3, function() {});
            pool.query(A4, function() {});
            pool.query(A5, function() {});
            pool.query(A6, function() {});
            pool.query(A7, function() {});

            pool.query(Q1, function() {});
            pool.query(Q2, function() {});
            pool.query(Q3, function() {});

			let CastleNO = "INSERT INTO belivers.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('Castle', '3', '3', '"+result.insertId+"') ";
			let CastleNE = "INSERT INTO belivers.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('Castle', '3', '4', '"+result.insertId+"') ";
			let CastleSO = "INSERT INTO belivers.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('Castle', '4', '3', '"+result.insertId+"') ";
            let CastleSE = "INSERT INTO belivers.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('Castle', '4', '4', '"+result.insertId+"') ";

            let farmpos1 = "INSERT INTO belivers.tile(Type, Availability, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', 1, '1', '1', '"+result.insertId+"') ";
            let farmpos2 = "INSERT INTO belivers.tile(Type, Availability, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', 1, '1', '2', '"+result.insertId+"') ";
            let farmpos3 = "INSERT INTO belivers.tile(Type, Availability, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', 1, '1', '3', '"+result.insertId+"') ";
            let farmpos4 = "INSERT INTO belivers.tile(Type, Availability, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', 1, '2', '1', '"+result.insertId+"') ";
            let farmpos5 = "INSERT INTO belivers.tile(Type, Availability, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', 1, '2', '2', '"+result.insertId+"') ";
            let farmpos6 = "INSERT INTO belivers.tile(Type, Availability, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', 1, '2', '3', '"+result.insertId+"') ";
            let farmpos7 = "INSERT INTO belivers.tile(Type, Availability, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', 1, '3', '1', '"+result.insertId+"') ";
            let farmpos8 = "INSERT INTO belivers.tile(Type, Availability, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', 1, '3', '2', '"+result.insertId+"') ";

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
        }, 3);
        })
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