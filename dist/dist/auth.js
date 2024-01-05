"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("dotenv/config");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _passport = _interopRequireDefault(require("passport"));
require("./passport");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var jwtSecret = process.env.JWT_SECRET;
var generateJWTToken = function generateJWTToken(user) {
  return _jsonwebtoken["default"].sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256'
  });
};

//  POST login
var _default = function _default(router) {
  router.post('/api/v1/users/login', function (req, res) {
    _passport["default"].authenticate('local', {
      session: false
    }, function (error, user, info) {
      if (error || !user) {
        return res.status(400).json({
          message: 'Please check your username and password',
          user: user
        });
      }
      req.login(user, {
        session: false
      }, function (error) {
        if (error) {
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({
          user: user,
          token: token,
          message: "User has been successfully login"
        });
      });
    })(req, res);
  });
};
exports["default"] = _default;