const path =  require('path');

const express = require('express');

const router = express.Router();

router.get('/Credits', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'View', 'Credits.html'));
});

router.get('/Register', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'View', 'Register.html'));
});

module.exports = router;