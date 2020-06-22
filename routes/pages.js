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


//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-

module.exports = router; 