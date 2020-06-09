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

// ## LOGOUT OPTION 
router.get('/logout', (req, res, next) => {
    if(req.session.user)
    {
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

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

                                                            //GET THE REMAINING BUILDING'S POSITION AVAILABLE

        //GET FARM FREE SLOT POSITION

router.get("/getFarmPos/:playerLoged", function(req,res){

	let playerlogedID = req.params.playerLoged;
	
	let sql = "SELECT PosX, PosY FROM tile WHERE Type = 'Farm' AND PlayerID_FK_Tile="+playerlogedID;
	
	pool.query(sql, (err, result)=>{
    if(err) throw err;
    res.send(result)
	});
});

        //GET BARRACK FREE SLOT POSITION

router.get("/getBarrackPos/:playerLoged", function(req,res){

    let playerlogedID = req.params.playerLoged;
    
    let sql = "SELECT PosX, PosY FROM tile WHERE Type = 'Barrack' AND PlayerID_FK_Tile="+playerlogedID;
    
    pool.query(sql, (err, result)=>{
    if(err) throw err;
    res.send(result)
    });
});

        //GET BANK FREE SLOT POSITION

router.get("/getBankPos/:playerLoged", function(req,res){

	let playerlogedID = req.params.playerLoged;
	
	let sql = "SELECT PosX, PosY FROM tile WHERE Type = 'Bank' AND PlayerID_FK_Tile="+playerlogedID;
	
	pool.query(sql, (err, result)=>{
    if(err) throw err;
    res.send(result)
	});
});

        //GET CHURCH FREE SLOT POSITION

router.get("/getChurchPos/:playerLoged", function(req,res){

	let playerlogedID = req.params.playerLoged;
	
	let sql = "SELECT PosX, PosY FROM tile WHERE Type = 'Church' AND PlayerID_FK_Tile="+playerlogedID;
	
	pool.query(sql, (err, result)=>{
    if(err) throw err;
    res.send(result)
	});
});


                                                            //INSERT BUILDING IN THE TILE

        //INSERT A FARM IN THE DATABASE

router.post("/farmDB", function(req,res){

    let playerlogedID = req.body.playerID;
    let Type = "Farm"
    let PosX = req.body.TileX;
    let PosY = req.body.TileY;

    
    let sql = "INSERT INTO building(Type, PosX, PosY, PlayerID_FK_Building) VALUES('"+Type+"', '"+PosX+"', '"+PosY+"', '"+playerlogedID+"' )";

    pool.query(sql, ()=>{res.send(true)});
});

        //INSERT A BARRACK IN THE DATABASE

router.post("/barrackDB", function(req,res){

    let playerlogedID = req.body.playerID;
    let Type = "Barrack"
    let PosX = req.body.TileX;
    let PosY = req.body.TileY;

    
    let sql = "INSERT INTO building(Type, PosX, PosY, PlayerID_FK_Building) VALUES('"+Type+"', '"+PosX+"', '"+PosY+"', '"+playerlogedID+"' )";

    pool.query(sql, ()=>{res.send(true)});
});

        //INSERT A BANK IN THE DATABASE

router.post("/bankDB", function(req,res){

    let playerlogedID = req.body.playerID;
    let Type = "Bank"
    let PosX = req.body.TileX;
    let PosY = req.body.TileY;

    
    let sql = "INSERT INTO building(Type, PosX, PosY, PlayerID_FK_Building) VALUES('"+Type+"', '"+PosX+"', '"+PosY+"', '"+playerlogedID+"' )";

    pool.query(sql, ()=>{res.send(true)});
});

        //INSERT A CHURCH IN THE DATABASE

router.post("/churchDB", function(req,res){

    let playerlogedID = req.body.playerID;
    let Type = "Church"
    let PosX = req.body.TileX;
    let PosY = req.body.TileY;

    
    let sql = "INSERT INTO building(Type, PosX, PosY, PlayerID_FK_Building) VALUES('"+Type+"', '"+PosX+"', '"+PosY+"', '"+playerlogedID+"' )";

    pool.query(sql, ()=>{res.send(true)});
});


router.post('/getNewQuestion',sq.PickRandomQuestion);


router.post('/changeStats',sq.ChangeStatsFunction);


                                                            //REMOVE THIS TILE POSITION FROM THE DATABASE

        //REMOVE THE TILE AVAILABLE FOR THE FARM

router.post("/removeFarm", function(req,res){

    let playerlogedID = req.body.playerID;
    let RemoveX = req.body.TileX;
    let RemoveY = req.body.TileY;

    let sql = "DELETE FROM belivers.tile WHERE PosX = '"+RemoveX+"' AND PosY = '"+RemoveY+"' AND Type = 'Farm' AND PlayerID_FK_Tile = '"+playerlogedID+"'; "
    
    pool.query(sql, (err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

        //REMOVE THE TILE AVAILABLE FOR THE BARRACK

router.post("/removeBarrack", function(req,res){

    let playerlogedID = req.body.playerID;
    let RemoveX = req.body.TileX;
    let RemoveY = req.body.TileY;

    let sql = "DELETE FROM belivers.tile WHERE PosX = '"+RemoveX+"' AND PosY = '"+RemoveY+"' AND Type = 'Barrack' AND PlayerID_FK_Tile = '"+playerlogedID+"'; "
    
    pool.query(sql, (err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

        //REMOVE THE TILE AVAILABLE FOR THE BANK

router.post("/removeBank", function(req,res){

    let playerlogedID = req.body.playerID;
    let RemoveX = req.body.TileX;
    let RemoveY = req.body.TileY;

    let sql = "DELETE FROM belivers.tile WHERE PosX = '"+RemoveX+"' AND PosY = '"+RemoveY+"' AND Type = 'Bank' AND PlayerID_FK_Tile = '"+playerlogedID+"'; "
    
    pool.query(sql, (err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

        //REMOVE THE TILE AVAILABLE FOR THE FARM

router.post("/removeChurch", function(req,res){

    let playerlogedID = req.body.playerID;
    let RemoveX = req.body.TileX;
    let RemoveY = req.body.TileY;

    let sql = "DELETE FROM belivers.tile WHERE PosX = '"+RemoveX+"' AND PosY = '"+RemoveY+"' AND Type = 'Church' AND PlayerID_FK_Tile = '"+playerlogedID+"'; "
    
    pool.query(sql, (err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-

module.exports = router; 