//import packages
const express = require('express');
const session = require('express-session');
const path = require('path');

const pageRouter = require('./routes/pages')

const app = express();

// for body parser
app.use(express.urlencoded({ extended: false }));

// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, 'public')));

// Template engine. PUG
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'pug');

app.use(session({
    secret: "All Aboard session",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 * 30 }
}));

app.use(pageRouter);
app.use(express.static('Game'));

// 404 -> page not found
app.use((req, res, next) => {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
});

// handling other errors
app.use((req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// setting up the server
app.listen(3000, () => {
    console.log('Server is running');
});

module.exports = app;