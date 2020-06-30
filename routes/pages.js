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
        res.redirect('/');
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

    let user = req.session.user;
    if(user) 
    {
        res.render('menuScript', { title: "Fight thy Path [menu]" });
        return;
    }
    // if no section redicrect to index
    res.redirect('/');
    
})

router.get('/dead', (req, res, next) => {

    res.render('deadScript.pug', { title: "Fight thy Path [dead]" });

})

// ## 4 - POST REGISTER DATA
router.post('/register', (req, res, next) => {
    //REGISTER POST DATA
    let newUser = {
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    };

    let sql = "SELECT * FROM fightthypath.user WHERE UserName='"+newUser.username+"' ";

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
    res.render('leaderBoardScript');
})

        //GET PLAYER INFORMATION FROM THE DATABASE

router.get("/getPlayer", function(req,res){

    let user = req.session.user
    let username = user.UserName
    let sql = 'SELECT * FROM Player WHERE UserID_FK_Player = (SELECT UserID FROM user WHERE UserName = "'+username+'") and Concluded = false ;';
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
    
    let sql = "select * from Building where PlayerID_FK_Building = (select PlayerID from Player where UserID_FK_Player = (select UserID from User where Username = '"+playerlogedID+"')order by Score desc limit 1)";
    
    pool.query(sql, (err,result)=>{
    if(err) throw err;
    res.send(result);
    console.log(result)
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
    let sql = 'SELECT UserID, UserName FROM User WHERE UserName = "'+username+'" LIMIT 1;';
		
	pool.query(sql, (err,result)=>{
        if(err) throw err;
        res.send(result[0]);
	});
});

router.post('/checkPlayerActiveRun',function (req,res){
    let sql = "select PlayerID from Player where UserID_FK_Player = '"+req.body.userID+"' and Concluded = false;";
    pool.query(sql, (err,result)=>{
        if (err) throw err;
        if (result[0] != null){
            res.send(result[0]);
        }else{
            res.send(false);
        }
    });
});


router.post('/newRun',function (req,res,callback){ 
    let userID = req.body.userID;
    let username = req.body.Username
    let sql = "update Player set Concluded = true where UserID_FK_Player ='"+req.body.userID+"' and Concluded = false;";
    pool.query(sql, (err,result)=>{
        if (err) throw err;
        let player = "INSERT INTO player(UserID_FK_Player, Concluded, Wheat, Swords, Gold, Faith, Score,PlayerName) VALUES('"+userID+"', FALSE, '50', '50', '50', '50', 0, '"+username+"'); "
        pool.query(player, function() {
            let sql1 = "select * from Question;";
            pool.query(sql1,(err1,result1)=>{
                if (err1) throw err1;
                let fodase = "select PlayerID from Player where UserID_FK_Player = '"+userID+"' and Concluded = false "
                pool.query(fodase,(fodase1,fodase2)=>{
                    if (fodase1) throw fodase1;
                    for (let i = 0;i < result1.length ;i++) {
                        let b = i +1
                        let QuestionToInsert = "insert into fightthypath.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values('"+fodase2[0].PlayerID+"',false,'"+b+"');";
                        pool.query(QuestionToInsert,(err2,result2)=>{
                            if (err2) throw err2;
                        });
                    }

                    let CastleNO = "INSERT INTO fightthypath.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('CastleNW', '3', '3', '"+fodase2[0].PlayerID+"') ";
                    let CastleNE = "INSERT INTO fightthypath.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('CastleNE', '3', '4', '"+fodase2[0].PlayerID+"') ";
                    let CastleSO = "INSERT INTO fightthypath.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('CastleSW', '4', '3', '"+fodase2[0].PlayerID+"') ";
                    let CastleSE = "INSERT INTO fightthypath.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('CastleSE', '4', '4', '"+fodase2[0].PlayerID+"') ";

                    let farmpos1 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '1', '1', '"+fodase2[0].PlayerID+"') ";
                    let farmpos2 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '1', '2', '"+fodase2[0].PlayerID+"') ";
                    let farmpos3 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '1', '3', '"+fodase2[0].PlayerID+"') ";
                    let farmpos4 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '2', '1', '"+fodase2[0].PlayerID+"') ";
                    let farmpos5 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '2', '2', '"+fodase2[0].PlayerID+"') ";
                    let farmpos6 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '2', '3', '"+fodase2[0].PlayerID+"') ";
                    let farmpos7 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '3', '1', '"+fodase2[0].PlayerID+"') ";
                    let farmpos8 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '3', '2', '"+fodase2[0].PlayerID+"') ";

                    let barrack1 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '1', '4', '"+fodase2[0].PlayerID+"') ";
                    let barrack2 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '1', '5', '"+fodase2[0].PlayerID+"') ";
                    let barrack3 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '1', '6', '"+fodase2[0].PlayerID+"') ";
                    let barrack4 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '2', '4', '"+fodase2[0].PlayerID+"') ";
                    let barrack5 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '2', '5', '"+fodase2[0].PlayerID+"') ";
                    let barrack6 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '2', '6', '"+fodase2[0].PlayerID+"') ";
                    let barrack7 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '3', '5', '"+fodase2[0].PlayerID+"') ";
                    let barrack8 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '3', '6', '"+fodase2[0].PlayerID+"') ";

                    let bank1 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '4', '1', '"+fodase2[0].PlayerID+"') ";
                    let bank2 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '4', '2', '"+fodase2[0].PlayerID+"') ";
                    let bank3 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '5', '1', '"+fodase2[0].PlayerID+"') ";
                    let bank4 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '5', '2', '"+fodase2[0].PlayerID+"') ";
                    let bank5 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '5', '3', '"+fodase2[0].PlayerID+"') ";
                    let bank6 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '6', '1', '"+fodase2[0].PlayerID+"') ";
                    let bank7 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '6', '2', '"+fodase2[0].PlayerID+"') ";
                    let bank8 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '6', '3', '"+fodase2[0].PlayerID+"') ";

                    let church1 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '4', '5', '"+fodase2[0].PlayerID+"') ";
                    let church2 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '4', '6', '"+fodase2[0].PlayerID+"') ";
                    let church3 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '5', '4', '"+fodase2[0].PlayerID+"') ";
                    let church4 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '5', '5', '"+fodase2[0].PlayerID+"') ";
                    let church5 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '5', '6', '"+fodase2[0].PlayerID+"') ";
                    let church6 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '6', '4', '"+fodase2[0].PlayerID+"') ";
                    let church7 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '6', '5', '"+fodase2[0].PlayerID+"') ";
                    let church8 = "INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '6', '6', '"+fodase2[0].PlayerID+"') ";
                    
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

            

            res.send(true)
        });
    })
});
router.get("/getDeadText/:playerID", function(req,res){
    console.log("FINITO")
        let playerlogedID = req.params.playerID;
        let sql0 = "select * from leaderboard where playerID_FK_leaderboard = '"+playerlogedID+"';";
        pool.query(sql0,(err0,result0) =>{
            if (err0) throw err0;
            console.log(result0)
            let sql1 = "select * from CauseOfDeath where CauseOfDeathID = '"+result0[0].CauseOfDeathID_FK_Leaderboard+"'";
            pool.query(sql1,(err1,result1)=>{
    
                if (err1) throw err1;
                console.log(result1)
                res.send(result1);
            })
        })
    });

router.get("/playersBoard", function(req,res){
let sql = "SELECT Score, PlayerName FROM player ORDER BY Score DESC LIMIT 10"    
    
    pool.query(sql, (err, result) => {
        console.log(result)
        for(i = 0; i < 10; i++){
            if(result[i]){}else{result.push({
                PlayerName: "Empty", 
                Score: "Empty"
            })}
        }
        res.send(result)
    })
})



module.exports = router; 