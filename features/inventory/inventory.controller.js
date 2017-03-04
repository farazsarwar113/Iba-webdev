var Inventory = require('../inventory/inventory.model.js');
var passport = require('passport');
var Verify = require('../../server/verify.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var auth = require('../../server/auth');

exports.listAllProduct = function (req, res, next) {
  Inventory.find({}, function (err, inventory) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again.',
        data: err
      });
    }
    if (inventory.length == 0) {
      res.status(200).json({
        success: true,
        message: 'Customers not found.',
        data: []
      });
    }
      res.status(200).json({
      success: true,
      message: 'Customers found successfully.',
      data: inventory[0]
    });
  });
};
exports.addInventory = function (req, res, next) {
  var inventory = new Inventory();
  inventory.save();
  res.send('Added')
};
