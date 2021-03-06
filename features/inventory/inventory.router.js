var express = require('express');
var router = express.Router();
var inventoryCtrl = require('./inventory.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');


router.route('/')
    .get(verify.user,verify.unseal, inventoryCtrl.listInventory)
    .post(verify.user, verify.unseal,inventoryCtrl.addInventory)

module.exports = router;