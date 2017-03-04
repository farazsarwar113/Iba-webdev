var express = require('express');
var router = express.Router();
var empCtrl = require('./employee.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET employees
router.get('/', verify.user, empCtrl.listAllEmp);

module.exports = router;