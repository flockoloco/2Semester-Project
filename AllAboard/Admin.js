const path =  require('path');
const express = require('express');
const router = express.Router();
const app = express();

const db = require('../database/database');

router.get('/Credits', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'View', 'Credits.html'));
});

router.get('/Register', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'View', 'Register.html'));
});

router.post('/AllAboard', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'View', 'index.html'));
})

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'View', 'MainPage.html'));
});

exports.routes = router; 