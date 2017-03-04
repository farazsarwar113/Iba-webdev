var express = require('express');
var router = express.Router();
var inventoryCtrl = require('./inventory.controller.js');
var productCtrl = require('.')
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET all products
router.route('/:nid/product')
    .get(verify.user, inventoryCtrl.listAllProduct)
    .post(verify.user, verify.admin, productCtrl.addProduct)

//get specific product
router.route('/:nid/product/:pid')
    .get(verify.user, productCtrl.getProduct)
    .put(verify.user, verify.admin, productCtrl.updateProduct)
    .delete(verify.user, verify.admin, productCtrl.deleteProduct);

router.route('/:nid/product/:pid/place/order')
    .post(verify.user, productCtrl.placeOrder)
    .delete(verify.user, productCtrl.cancelOrder);

module.exports = router;