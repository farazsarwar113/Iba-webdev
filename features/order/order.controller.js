var Order = require('./order.model.js');
var User = require('../users/user.model.js');
var Product = require('../product/product.model.js');
var passport = require('passport');
var Verify = require('../../server/verify.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var auth = require('../../server/auth');

exports.listAllOrder = function (req, res, next) {
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
        res.status(200).json({
            success: true,
            message: 'Orders found successfully.',
            data: order
        });
    });
};

exports.placeOrder = function (req, res) {
    User.findById(req._user._id)
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Please try again.',
                    data: err
                });
            }
            Product.findById(req.params.pid)
                .exec(function (err, product) {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: 'Something went wrong. Please try again.',
                            data: err
                        });
                    }
                    if (!product || product == null) {
                        res.status(200).json({
                            success: true,
                            message: 'Product not found. Please check product Id.',
                            data: null
                        });
                    }

                    if (product.stock == 0) {
                        res.status(200).json({
                            success: true,
                            message: 'Product not in a stock',
                            data: null
                        });
                    }
                    else {
                        if (user.role == 0) {
                            product.stock -= req.body.stock;
                        }
                        if (user.role == 2) {
                            product.stock += req.body.stock;
                        }
                        var obj = {
                            product: product._id,
                            status: 0,
                            total_bill: product.price,
                            user_id: req._user._id
                        };
                        var order = new Order(obj);

                        order.save(function (err, order) {
                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: 'Something went wrong. Please try again.',
                                    data: err
                                });
                            }
                                res.status(200).json({
                                    success: true,
                                    message: 'Successfully placed order',
                                    data: order
                                });
                        })


                    }

                })
        })

}

