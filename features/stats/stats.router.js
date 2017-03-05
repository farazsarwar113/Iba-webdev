var express = require('express');
var router = express.Router();
var statsCtrl = require('./stats.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET employees
router.get('/orders', verify.user,verify.unseal, statsCtrl.listAllOrderCount);

module.exports = router;