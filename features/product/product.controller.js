var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var Product = require('./product.model');
var Inventory = require('../inventory/inventory.model');
var User = require('../users/user.model');

exports.listAllProduct = function (req, res) {
    Product.find({})
        .exec(function (err, products) {
            if (err) {

                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Please try again.',
                    data: err
                });
            }
            if (products.length == 0) {
                res.status(200).json({
                    success: true,
                    message: 'Products not found.',
                    data: []
                });
            }
            res.status(200).json({
                success: true,
                message: 'All products fetched successfully.',
                data: products
            });
        });
}

exports.addProduct = function (req, res) {
    var obj = {
        product_name: req.body.product_name || '',
        price: req.body.price || '',
        company: req.body.company,
        type: req.body.type,
        status: req.body.status,
        available: req.body.available,
        stock: req.body.stock
    };
    var product = new Product(obj);
    Inventory.find({})
        .exec(function (err, inventory) {
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
                    message: 'Inventory not found.',
                    data: null
                });
            }
            inventory[0].products.push(product._id);

            inventory.save(function (err, inventory) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Something went wrong. Please try again.',
                        data: err
                    });
                }
                product.save(function (err, product) {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: 'Something went wrong. Please try again.',
                            data: err
                        });
                    }
                    res.status(200).json({
                        success: true,
                        message: 'Product added successfully.',
                        data: product
                    });
                })
            })
        })
}
exports.getProduct = function (req, res) {
    Product.findById(req.params.pid)
        .exec(function (err, product) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Please try again.',
                    data: err
                });
            }
            if (!product) {
                res.status(200).json({
                    success: true,
                    message: 'Product not found. check product id.',
                    data: null
                });
            }
            res.status(200).json({
                success: true,
                message: 'Product fetched successfully.',
                data: product
            });
        });
}

exports.updateProduct = function (req, res) {
    Product.findById(req.params.pid)
        .exec(function (err, product) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Please try again.',
                    data: err
                });
            }
            product.product_name = req.body.product_name || product.product_name;
            product.price = req.body.price || product.price;
            product.type = req.body.type || product.type;
            product.status = req.body.status || product.status;
            product.available = req.body.available || product.available;
            product.stock = req.body.stock || product.stock;

            product.save(function (err, product) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Something went wrong. Please try again.',
                        data: err
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'Product fetched successfully.',
                    data: product
                });
            })
        });
}
exports.deleteProduct = function (req, res) {
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
            Product.remove(req.params.pid, function (err, deleted) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Something went wrong. Please try again.',
                        data: err
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'Product deleted successfully.',
                    data: null
                });
            })
        })
}
exports.placeOrder = function (req, res) {
    User.findById(req._user._id)
        .populate('ordered_products.product')
        .exec(function (err, user) {
            if(err){
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Please try again.',
                    data: err
                });
            }
            Product.findbyId(req.params.pid)
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
                        if(product.available == false){
                            res.status(200).json({
                                success: true,
                                message: 'Product not available',
                                data: null
                            });
                        }
                        else{
                            if(product.stock == 0){
                                res.status(200).json({
                                    success: true,
                                    message: 'Product not in a stock',
                                    data: null
                                });
                            }
                            else {
                                if(user.role == 0){
                                    product.stock -= req.body.stock;
                                }
                                if(user.role == 2){
                                    product.stock += req.body.stock;
                                }
                                var obj = {
                                    product: product._id
                                };
                                user.ordered_products.push(obj);

                                var bill;
                                for(var i =0; i< user.ordered_products.length; i++){
                                    bill += ordered_products[i].product.price;
                                }
                                user.total_bill = bill;
                                user.save(function (err, user) {
                                    if(err){
                                        return res.status(500).json({
                                            success: false,
                                            message: 'Something went wrong. Please try again.',
                                            data: err
                                        });
                                    }
                                    product.save(function (err, product) {
                                        if(err){
                                            return res.status(500).json({
                                                success: false,
                                                message: 'Something went wrong. Please try again.',
                                                data: err
                                            });
                                        }
                                        res.status(200).json({
                                            success: true,
                                            message: 'Successfully placed order',
                                            data: product
                                        });
                                    })
                                })

                            }

                    }

                })
        })

}
