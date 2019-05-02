// Application routing using Express.Router()
'use strict';

var express = require('express');

// Sett Routing 
var router = express.Router();

// Initial page => dashboard
router.get('/', function (req, res) {
    res.render('pages/dashboard');
});

// Goto Bot page => bot
router.get('/bots', function (req, res) {
    res.render('pages/bots');
});

// connect page => connect.
router.get('/connect',  function (req, res) {
    res.render('pages/connect');
});

// dialog pag => 
router.get('/dialogs', function (req, res) {
    res.render('pages/dialogs');
});

module.exports = router;