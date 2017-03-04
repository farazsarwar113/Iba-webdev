var User = require('../users/user.model.js');
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
    User.findById(req._user._id)
        .populate('ordered_products.product')
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Please try again.',
                    data: err
                });
            }
            if (!user) {
                res.status(200).json({
                    success: true,
                    message: 'Supplier not found.',
                    data: null
                });
            }
            if(user.role != 2){
                res.status(200).json({
                    success: true,
                    message: 'Not Authorized',
                    data: null
                });
            }
            var arr = user.ordered_products;
            res.status(200).json({
                success: true,
                message: 'Suppliers product found successfully.',
                data: arr
            });
        });
};
