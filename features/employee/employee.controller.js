var User = require('../users/user.model.js');
var passport = require('passport');
var Verify = require('../../server/verify.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var auth = require('../../server/auth');

exports.listAllEmp = function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again.',
        data: err
      });
    }
    if (users.length == 1) {
      res.status(200).json({
        success: true,
        message: 'Employee not found.',
        data: []
      });
    }
    var arr = [];
    for (var i = 0; i < users.length; i++) {
      if (users[i].role == 0) {
        arr.push(users[i]);
      }
    }
    res.status(200).json({
      success: true,
      message: 'Employee found successfully.',
      data: arr
    });
  });
};

