var User = require('../users/user.model.js');
var Order = require('../order/order.model.js');
var passport = require('passport');
var Verify = require('../../server/verify.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var auth = require('../../server/auth');

exports.listAllSuppliers = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        if (users.length == 0) {
            res.status(200).json({
                success: true,
                message: 'Suppliers not found.',
                data: []
            });
        }
        var arr = [];
        for (var i = 0; i < users.length; i++) {
            if (users[i].role == 2) {
                arr.push(users[i]);
            }
        }
        res.status(200).json({
            success: true,
            message: 'Suppliers found successfully.',
            data: arr
        });
    });
};
exports.getSuppPro = function (req, res, next) {
    Order.find({})
        .populate('user_id')
        .exec(function (err, order) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Please try again.',
                    data: err
                });
            }
            if (order.length == 0) {
                res.status(200).json({
                    success: true,
                    message: 'order not found.',
                    data: []
                });
            }
            var arr = []
            for(var i=0; i< order.length; i++){
                if(order[i].user_id.role == 2){
                    arr.push(order[i]);
                }
            }
            res.status(200).json({
                success: true,
                message: 'Orders data found successfully.',
                data: arr
            });
        });
};
