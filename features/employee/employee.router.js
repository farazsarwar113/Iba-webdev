var express = require('express');
var router = express.Router();
var empCtrl = require('./employee.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET employees
router.get('/', verify.user, verify.admin, cusCtrl.listAllCus);

//get supplier product
// router.get('/products', verify.user, cusCtrl.getCusPro);

module.exports = router;