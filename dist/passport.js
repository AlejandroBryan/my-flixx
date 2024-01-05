"use strict";

require("dotenv/config");
var _passport = _interopRequireDefault(require("passport"));
var _passportLocal = require("passport-local");
var _usersModel = _interopRequireDefault(require("./models/usersModel"));
var _passportJwt = require("passport-jwt");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_passport["default"].use(new _passportLocal.Strategy({
  usernameField: 'Username',
  passwordField: 'Password'
}, function (username, password, done) {
  _usersModel["default"].findOne({
    Username: username
  }, function (error, user) {
    if (error) {
      return done(error);
    }
    console.log(user);
    if (!user) {
      return done(null, false, {
        message: 'Incorrect username.'
      });
    }
    if (!user.validatePassword(password)) {
      return done(null, false, {
        message: 'Incorrect password.'
      });
    }
    console.log(user);
    done(null, user);
  });
}));
_passport["default"].use(new _passportJwt.Strategy({
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, function (jwtPayload, done) {
  return _usersModel["default"].findById(jwtPayload._id).then(function (user) {
    return done(null, user);
  })["catch"](function (error) {
    return done(error);
  });
}));