var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  password: String,
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  admin: {
    type: Boolean,
    default: false
  },
  role:{
    type: Number,
    default: 0  // 0 for cust    1 for emp   2 for supp  3 for admin
  },
  city:{
    type: String,
    default: ''
  },
  address:{
    type: String,
    default: ''
  },
  phone_number:{
    type: String,
    default: ''
  },
  emp_role: {
    type: String,
    default:''
  },
  ordered_products: [{
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
    }
  }],
  total_bill: {
    type: Number,
    default: 0
  }
});

User.methods.getName = function () {
  return (this.firstname + ' ' + this.lastname);
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);