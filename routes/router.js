var express = require('express');
var users =  require('../features/users/user.router');
var customer =  require('../features/customer/customer.router');
var supplier =  require('../features/supplier/supplier.router');
var products =  require('../features/product/product.router');
var inventory =  require('../features/inventory/inventory.router');
var employees =  require('../features/employee/employee.router');
var stats =  require('../features/stats/stats.router');
var order =  require('../features/order/order.router');
var log = require('tracer').console({format : "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../server/verify');

module.exports = function (app, config, models) {
  var router = express.Router();

  router.use('/users',users);
  router.use('/customers',customer);
  router.use('/supplier', supplier);
  router.use('/products', products);
  router.use('/inventory', inventory);
  router.use('/order', order);
  router.use('/employees', employees);
  router.use('/stats', stats);

  app.use('/api', router);
};
