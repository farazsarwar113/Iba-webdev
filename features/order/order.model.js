var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    date: {
        type: Date,
        default: Date.now
    },
    status:{
        type: Number,
        default: 0  //0 for not delivered  1 for delivered
    },
    total_bill: {
        type: Number,
        default: 0
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Order', Order);