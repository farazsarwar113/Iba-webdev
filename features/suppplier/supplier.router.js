var express = require('express');
var router = express.Router();
var supplierCtrl = require('./supplier.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET suppliers
router.get('/', verify.user, verify.admin, supplierCtrl.listAllSuppliers);

//get supplier product
router.get('/products', verify.user, supplierCtrl.getSuppPro);

module.exports = router;