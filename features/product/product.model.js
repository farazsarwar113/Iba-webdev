var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Product = new Schema({
    product_name: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    company: {
        type: Boolean,
        default: false
    },
    type:{
        type: String
    },
    status: {
        type: Number,
        default: 0  // 0 for not delivered 1 for delivered
    },
    stock: {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: true
    },
    supplier:{
        type: Schema.Types.ObjectId,
        ref: 'Supplier'
    }
});

module.exports = mongoose.model('Product', Product);