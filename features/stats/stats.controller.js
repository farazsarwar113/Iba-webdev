var Order = require('../order/order.model.js');
var User = require('../users/user.model.js');
var Product = require('../product/product.model.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;

exports.listAllOrderCount = function (req, res, next) {
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
                    var sales = 0;
            var purchase = 0;
            var salesTotal = 0;
            var purchaseTotal = 0;
            for(var i=0; i< order.length; i++){
                if(order[i].user_id.role == 0){
                    sales++
                    salesTotal =+ order[i].total_bill;
                }
                else if(order[i].user_id.role == 2){
                    purchase++;
                    purchaseTotal =+ order[i].total_bill;
                }
            }

            res.status(200).json({
                success: true,
                message: 'Orders data found successfully.',
                data: {
                    total_orders: order.length,
                    sales: sales,
                    purchase: purchase,
                    salesTotal: salesTotal,
                    purchaseTotal: purchaseTotal
                }
            });
        

    });
};