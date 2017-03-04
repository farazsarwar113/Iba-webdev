var express = require('express');
var router = express.Router();
var cusCtrl = require('./customer.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET suppliers
router.get('/', verify.user, verify.admin, cusCtrl.listAllCus);

//get supplier product
router.get('/products', verify.user, cusCtrl.getCusPro);

module.exports = router;