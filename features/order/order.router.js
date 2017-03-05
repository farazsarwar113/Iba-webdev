var express = require('express');
var router = express.Router();
var orderCtrl = require('./order.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

router.get('/', verify.user,verify.unseal, verify.admin, orderCtrl.listAllOrder);

router.route('/:pid/place/order')
    .post(verify.user,verify.unseal, orderCtrl.placeOrder);

module.exports = router;