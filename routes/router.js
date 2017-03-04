var express = require('express');
var users =  require('../features/users/user.router');
var customer =  require('../features/customer/customer.router');
var supplier =  require('../features/supplier/supplier.router');
var products =  require('../features/product/product.router');
var inventory =  require('../features/inventory/inventory.router');
var log = require('tracer').console({format : "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../server/verify');

module.exports = function (app, config, models) {
  var router = express.Router();

  router.use('/users',users);
  router.use('/customers',customer);
  router.use('/supplier', supplier);
  router.use('/products', products);
  router.use('/inventory', inventory);

  app.use('/api', router);
};
