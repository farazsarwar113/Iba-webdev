var express = require('express');
var router = express.Router();
var userCtrl = require('./user.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET users
router.get('/', verify.user, verify.unseal, verify.admin,userCtrl.listAll);

//Add user
router.post('/register', userCtrl.register);

//Login
router.post('/login', userCtrl.login);

//Logout
router.get('/logout', userCtrl.logout);

//Verify me
router.get('/me/verify', verify.nocache, verify.user, verify.unseal, userCtrl.verifyUser);

module.exports = router;