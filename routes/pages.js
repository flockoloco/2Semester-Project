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
        res.redirect('/home');
        return;
    }

    res.render('login', { title: "All Aboard" });

});

// ## 2 - HOME ROUTE Get Home Page
router.get('/home', (req, res, next) => {

    // ## USER INFO ON WEBPAGE
    let user = req.session.user;
    if(user) 
    {
        res.render('script', {opp: req.session.opp, name:user.username});
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
            res.redirect('/home');
        }
        else
        {
            res.send('Username/Password incorrect');
        }
    });
});

router.get('/register', (req, res, next) => {

    res.render('register', { title: "All Aboard" });

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
                res.redirect('/home');
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

    let sql = "SELECT PlayerName, Score FROM player ORDER BY Score DESC LIMIT 10"

    let Username1, Score1;

    
    
    pool.query(sql, (err, result) => {

        for(i = 0; i < 10; i++){
            if(result[i]){}else{result.push({
                PlayerName: null, 
                Score: null
            })}
        }
        res.render('leaderBoard', {result});
    })
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

        //GET THE CASTLE FROM THE DATABSE

router.get("/getCastle/:playerLoged", function(req,res){

    let playerlogedID = req.params.playerLoged;
	
	let sql = "SELECT * FROM building WHERE Type = 'Castle' AND PlayerID_FK_Building="+playerlogedID;
	
	pool.query(sql, (err,result)=>{
	if(err) throw err;
	res.send(result);
	});
});

        //GET THE FARM FROM THE DATABSE

router.get("/getFarm/:playerLoged", function(req,res){

    let playerlogedID = req.params.playerLoged;
	
	let sql = "SELECT * FROM building WHERE Type = 'Farm' AND PlayerID_FK_Building="+playerlogedID;
	
	pool.query(sql, (err,result)=>{
	if(err) throw err;
	res.send(result);
	});
});

        //GET THE BARRACKS FROM THE DATABSE

router.get("/getBarrack/:playerLoged", function(req,res){

    let playerlogedID = req.params.playerLoged;
	
	let sql = "SELECT * FROM building WHERE Type = 'Barrack' AND PlayerID_FK_Building="+playerlogedID;
	
	pool.query(sql, (err,result)=>{
	if(err) throw err;
	res.send(result);
	});
});

        //GET THE BANK FROM THE DATABSE

router.get("/getBank/:playerLoged", function(req,res){

    let playerlogedID = req.params.playerLoged;
	
	let sql = "SELECT * FROM building WHERE Type = 'Bank' AND PlayerID_FK_Building="+playerlogedID;
	
	pool.query(sql, (err,result)=>{
	if(err) throw err;
	res.send(result);
	});
});

        //GET THE CHURCH FROM THE DATABSE

router.get("/getChurch/:playerLoged", function(req,res){

    let playerlogedID = req.params.playerLoged;
	
	let sql = "SELECT * FROM building WHERE Type = 'Church' AND PlayerID_FK_Building="+playerlogedID;
	
	pool.query(sql, (err,result)=>{
	if(err) throw err;
	res.send(result);
	});
});

router.post('/getNewQuestion',sq.PickRandomQuestion);

router.post('/changeStats',sq.ChangeStatsFunction);

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-

module.exports = router; 