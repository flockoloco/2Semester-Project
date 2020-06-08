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

    if(newUser.password == newUser.confirmPassword){
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
    })}else{res.send('The Password and Confirm Password must match!')}

});

// ## LOGOUT
router.get('/logout', (req, res, next) => {
    if(req.session.user)
    {
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

router.get("/getPlayer", function(req,res){

    let user = req.session.user
    let username = user.UserName
    let sql = 'SELECT * FROM player WHERE PlayerID = (SELECT UserID FROM user WHERE UserName = "'+username+'" LIMIT 1);';
		
	pool.query(sql, (err,result)=>{
	    if(err) throw err;
        res.send(result);
	});
});

router.get("/getCastle/:playerLoged", function(req,res){

    let playerlogedID = req.params.playerLoged;
	
	let sql = "SELECT * FROM building WHERE Type = 'Castle' AND PlayerID_FK_Building="+playerlogedID;
	
	pool.query(sql, (err,result)=>{
	if(err) throw err;
	res.send(result);
	});
});

router.get("/getFarmPos/:playerLoged", function(req,res){

	let playerlogedID = req.params.playerLoged;
	
	let sql = "SELECT PosX, PosY FROM tile WHERE Availability = true AND PlayerID_FK_Tile="+playerlogedID;
	
	pool.query(sql, (err, result)=>{
    if(err) throw err;
    res.send(result)
	});
});

router.post("/FarmDB", function(req,res){

    let playerlogedID = req.body.player_id;
    let name = req.body.name;
    let posX = req.body.posX;
    let posY = req.body.posY;

    
    let sql = "INSERT INTO building(Type, PosX, PosY, PlayerID_FK_Building) VALUES('"+name+"', '"+posX+"', '"+posY+"', '"+playerlogedID+"' )";

    pool.query(sql, (err)=>{if(err) throw err;});
});
router.post('/getNewQuestion',sq.PickRandomQuestion);


router.post('/changeStats',sq.ChangeStatsFunction);






router.post("/UpdateTile/:playerLoged", function(req,res){

    let playerlogedID = req.params.playerLoged;
    let RemoveX = req.body.TileX;
    let RemoveY = req.body.TileY;

    console.log(RemoveX);
    console.log(RemoveY);
    let sql = "DELETE FROM belivers.tile WHERE PosX = '"+RemoveX+"' AND PosY = '"+RemoveY+"' AND PlayerID_FK_Tile = '"+playerlogedID+"'; "
    
    pool.query(sql, (err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

module.exports = router; 