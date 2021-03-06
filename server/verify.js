var User = require('../features/users/user.model');
var jwt = require('jsonwebtoken');
var Iron = require('iron');
var config = require('./../config/config');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;

exports.getToken = function (user, expiresIn) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: expiresIn || 3600
  });
};

exports.user = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secretKey, function (err, decoded) {
      if (err) {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        return next(err);
      } else {
        // if everything is good, save to request for use in other routes
        req._user = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    var err = new Error('No token provided!');
    err.status = 403;
    return next(err);
  }
};

exports.unseal = function (req, res, next) {
  Iron.unseal(req._user.data, config.sealPass, Iron.defaults, function (err, unsealed) {
    if (err) {
      return res.status(500).json({
        message: 'User verification error',
        success: false,
        data: null
      });
    }
    else {
      req._user = unsealed;
      next();
    }
  });
};

exports.nocache = function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

exports.admin = function (req, res, next) {
  // check header or url parameters or post parameters for token
  if(req._user){
    log(req._user)
    if(req._user.admin == true){
      next();
    }
    else{
      return res.status(403).json({
        "message": "You are not authorized to perform this operation!"
      });
    }
  }
  else{
    return res.status(403).json({
      "message": "You are not authorized!"
    });
  }


};

exports.verifyCus = function (req, res, next) {
  if(req._user){
    if(req._user.role == 0){
      next();
    }
    else{
      return res.status(403).json({
        "message": "You are not authorized to perform this operation!"
      });
    }
  }
  else{
    return res.status(403).json({
      "message": "You are not authorized!"
    });
  }
};
exports.verifySup = function (req, res, next) {
  if(req._user){
    if(req._user.role == 2){
      next();
    }
    else{
      return res.status(403).json({
        "message": "You are not authorized to perform this operation!"
      });
    }
  }
  else{
    return res.status(403).json({
      "message": "You are not authorized!"
    });
  }
};
exports.verifyEmp = function (req, res, next) {
  if(req._user){
    if(req._user.role == 1){
      next();
    }
    else{
      return res.status(403).json({
        "message": "You are not authorized to perform this operation!"
      });
    }
  }
  else{
    return res.status(403).json({
      "message": "You are not authorized!"
    });
  }
};