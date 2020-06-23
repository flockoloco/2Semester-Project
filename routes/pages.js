const express = require('express');
const User = require('../core/user');
const pool = require('../core/database');
const router = express.Router();
const user = new User();

const sq = require('./serverquestion')

// 1 - Get index page
router.get('/', (req, res, next) => {
    
    //## USER INFO ON INDEX
    let user = req.session.user;
    if(user)
    {
        res.redirect('/menu');
        return;
    }

    res.render('login', { title: "Fight thy Path [login]" });

});

// ## 2 - HOME ROUTE Get Home Page
router.get('/game', (req, res, next) => {

    // ## USER INFO ON WEBPAGE
    let user = req.session.user;
    if(user) 
    {
        res.render('gameScript', {opp: req.session.opp, name:user.username});
        return;
    }
    // if no section redicrect to index
    res.redirect('/');

});

// ## 3 - POST LOGIN DATA
router.post('/login', (req, res, next) => {

    //## LOGIN POST DATA
    user.login(req.body.username, req.body.password, function(result) {
        if(result)
        {
            // if we log in make a session and save user data
            req.session.user = result;
            req.session.opp = 1; // 1 for login and 0 for register
            res.redirect('/menu');
        }
        else
        {
            res.send('Username/Password incorrect');
        }
    });
});

router.get('/register', (req, res, next) => {

    res.render('register', { title: "Fight thy Path [register]" });

})

router.get('/menu', (req, res, next) => {

    res.render('menuScript', { title: "Fight thy Path [Menu]" });

})

// ## 4 - POST REGISTER DATA
router.post('/register', (req, res, next) => {
    //REGISTER POST DATA
    let newUser = {
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    };

    let sql = "SELECT * FROM belivers.user WHERE UserName='"+newUser.username+"' ";

    pool.query(sql, (err, result) => {
        if(err) throw err;
        if(result[0]){
            res.send("Sorry, Username already exist!")
    }

    else if(newUser.password != newUser.confirmPassword){
        res.send('The Password and Confirm Password must match!')
    }else{
        user.create(newUser, function(lastId){
        if(lastId)
        {
            // MAKE A SESSION
            user.find(lastId, function(result){
                req.session.user = result,
                req.session.opp = 0,
                res.redirect('/menu');
            });
        }
    })}
    })
});

// ## LOGOUT OPTION 
router.get('/logout', (req, res, next) => {
    if(req.session.user)
    {
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

router.get('/leaderBoard', (req, res, next) => {
        res.render('leaderBoardScript', { title: "Fight thy Path [leaderboard]" });
    })

        //GET PLAYER INFORMATION FROM THE DATABASE

router.get("/getPlayer", function(req,res){

    let user = req.session.user
    let username = user.UserName
    let sql = 'SELECT * FROM player WHERE PlayerID = (SELECT UserID FROM user WHERE UserName = "'+username+'" LIMIT 1);';
		
	pool.query(sql, (err,result)=>{
        if(err) throw err;
        res.send(result);
	});
});


                                                            //GET THE BUILDINGS

router.get("/getAllBuildings/:playerLoged", function(req,res){

    let playerlogedID = req.params.playerLoged;

    let sql = "SELECT * FROM building WHERE PlayerID_FK_Building ="+playerlogedID;
    
    pool.query(sql, (err,result)=>{
    if(err) throw err;
    res.send(result);
    });
});

        //GET ALL BUILDINGS BRO

router.get("/getAllBuildingsLeaderboard/:playerID", function(req,res){

    let playerlogedID = req.params.playerID;
    
    let sql = "SELECT * FROM building WHERE PlayerID_FK_Building = (select UserID_FK_Player from player where PlayerName ='"+playerlogedID+"') order by Type";
    
    pool.query(sql, (err,result)=>{
    if(err) throw err;
    res.send(result);
    });
});
router.get('/getPlayerStats/:playerLoged',function (req,res){
    let sql = "select * from Player where PlayerID = '"+req.params.playerLoged+"';";
    pool.query(sql, (err,result)=>{
        if(err) throw err;
        let objectToSend = {
            "wheat" : result[0].Wheat,
            "swords" : result[0].Swords,
            "gold" : result[0].Gold,
            "faith" : result[0].Faith
        }
	res.send(objectToSend);
	});
});

router.post('/getNewQuestion',sq.PickRandomQuestion);

router.post('/changeStats',sq.ChangeStatsFunction);


//Dunno if it should be here but oh well

router.get("/getUser", function(req,res){

    let user = req.session.user
    let username = user.UserName
    let sql = 'SELECT UserID FROM User WHERE UserName = "'+username+'" LIMIT 1;';
		
	pool.query(sql, (err,result)=>{
        if(err) throw err;
        res.send(result[0]);
	});
});

router.post('/checkPlayerActiveRun',function (req,res){
    let sql = "select PlayerID from Player where UserID_FK_Player = '"+req.body.userID+"' and Concluded = false;";
    pool.query(sql, (err,result)=>{
        if (err) throw err;
        if (result[0]){
            //theres already a current run!! 
            res.send(result[0].PlayerID);
        }else{
            res.send(false);
        }
    });
});


router.post('/newRun',function (req,res){ 

    let sql = "update Player set Concluded = true where UserID_FK_Player ='"+req.body.userID+"' and Concluded = false;";
    pool.query(sql, (err,result)=>{
        if (err) throw err;
        let hue = CreateNewPlayer(req.body.userID);
        res.send(hue);
    });
});
router.post('/continueRun',function (req,res){
    res.send(SelectForRun(req.body.userID))
 });
function SelectForRun(userID){
    let sql = "select PlayerID from Player where UserID_FK_Player = '"+userID+"' and Concluded = false;";
    pool.query(sql,(err,result)=>{
        if (err) throw err;
        return (result[0].PlayerID);
    });
}
function CreateNewPlayer(userID){
    let player = "INSERT INTO player(UserID_FK_Player, Concluded, Wheat, Swords, Gold, Faith, Score) VALUES('"+userID+"', FALSE, '50', '50', '50', '50', 0); "
    pool.query(player, function() {
        let sql1 = "select * from Question;";
        pool.query(sql1,(err1,result1)=>{
            if (err1) throw err1;
            for (let i = 0;i < result1.length ;i++) {
                let b = i +1
                let QuestionToInsert = "insert into belivers.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values('"+userID+"',false,'"+b+"');";
                pool.query(QuestionToInsert,(err2,result2)=>{
                    if (err2) throw err2;
                });
            }
        })

        let CastleNO = "INSERT INTO belivers.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('Castle', '3', '3', '"+userID+"') ";
        let CastleNE = "INSERT INTO belivers.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('Castle', '3', '4', '"+userID+"') ";
        let CastleSO = "INSERT INTO belivers.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('Castle', '4', '3', '"+userID+"') ";
        let CastleSE = "INSERT INTO belivers.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('Castle', '4', '4', '"+userID+"') ";

        let farmpos1 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '1', '1', '"+userID+"') ";
        let farmpos2 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '1', '2', '"+userID+"') ";
        let farmpos3 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '1', '3', '"+userID+"') ";
        let farmpos4 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '2', '1', '"+userID+"') ";
        let farmpos5 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '2', '2', '"+userID+"') ";
        let farmpos6 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '2', '3', '"+userID+"') ";
        let farmpos7 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '3', '1', '"+userID+"') ";
        let farmpos8 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '3', '2', '"+userID+"') ";

        let barrack1 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '1', '4', '"+userID+"') ";
        let barrack2 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '1', '5', '"+userID+"') ";
        let barrack3 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '1', '6', '"+userID+"') ";
        let barrack4 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '2', '4', '"+userID+"') ";
        let barrack5 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '2', '5', '"+userID+"') ";
        let barrack6 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '2', '6', '"+userID+"') ";
        let barrack7 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '3', '5', '"+userID+"') ";
        let barrack8 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '3', '6', '"+userID+"') ";

        let bank1 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '4', '1', '"+userID+"') ";
        let bank2 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '4', '2', '"+userID+"') ";
        let bank3 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '5', '1', '"+userID+"') ";
        let bank4 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '5', '2', '"+userID+"') ";
        let bank5 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '5', '3', '"+userID+"') ";
        let bank6 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '6', '1', '"+userID+"') ";
        let bank7 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '6', '2', '"+userID+"') ";
        let bank8 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '6', '3', '"+userID+"') ";

        let church1 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '4', '5', '"+userID+"') ";
        let church2 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '4', '6', '"+userID+"') ";
        let church3 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '5', '4', '"+userID+"') ";
        let church4 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '5', '5', '"+userID+"') ";
        let church5 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '5', '6', '"+userID+"') ";
        let church6 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '6', '4', '"+userID+"') ";
        let church7 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '6', '5', '"+userID+"') ";
        let church8 = "INSERT INTO belivers.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '6', '6', '"+userID+"') ";
        
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
        
        let bob = SelectForRun(userID);
  
        return bob;
    })
}


//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-




module.exports = router; 