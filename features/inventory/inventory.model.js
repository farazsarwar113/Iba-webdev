var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Inventory = new Schema({
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
});


module.exports = mongoose.model('Inventory', Inventory);