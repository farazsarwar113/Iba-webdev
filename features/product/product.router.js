var express = require('express');
var router = express.Router();
var productCtrl = require('./product.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET all products
router.route('/')
    .get(verify.user, productCtrl.listAllProduct)
    .post(verify.user, verify.admin, productCtrl.addProduct)

//get specific product
router.route('/:pid')
    .get(verify.user, productCtrl.getProduct)
    .put(verify.user, verify.admin, productCtrl.updateProduct)
    .delete(verify.user, verify.admin, productCtrl.deleteProduct);

router.route('/:pid/place/order')
    .post(verify.user, productCtrl.placeOrder);

module.exports = router;