const express = require('express');
const User = require('../core/user');
const router = express.Router();
const user = new User();

// 1 - Get index page
router.get('/', (req, res, next) => {
    
    //## USER INFO ON INDEX
    let user = req.session.user;
    if(user)
    {
        res.redirect('/home');
        return;
    }

    res.render('index', { title: "All Aboard MP" });

});

// ## 2 - HOME ROUTE Get Home Page
router.get('/home', (req, res, next) => {

    // ## USER INFO ON WEBPAGE
    let user = req.session.user;
    if(user)
    {
        res.render('home', {opp: req.session.opp, name:user.fullname});
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

// ## 4 - POST REGISTER DATA
router.post('/register', (req, res, next) => {

    //REGISTER POST DATA
    let newUser = {
        username: req.body.username,
        password: req.body.password
    };

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
        else
        {
            console.log('Error creating a new user');
        }
    });
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

module.exports = router; 