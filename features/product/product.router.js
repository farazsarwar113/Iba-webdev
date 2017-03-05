var express = require('express');
var router = express.Router();
var productCtrl = require('./product.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET all products
router.route('/')
    .get(verify.user,verify.unseal, productCtrl.listAllProduct)
    .post(verify.user,verify.unseal, verify.admin, productCtrl.addProduct)

//get specific product
router.route('/:pid')
    .get(verify.user,verify.unseal, productCtrl.getProduct)
    .put(verify.user,verify.unseal, verify.admin, productCtrl.updateProduct)
    .delete(verify.user,verify.unseal, verify.admin, productCtrl.deleteProduct);

module.exports = router;