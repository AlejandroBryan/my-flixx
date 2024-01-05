"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = function _default(err, req, res, next) {
  var status = err.statusCode || 500;
  var message = err.message || 'Oh No, Something Went Wrong!';
  res.status(status).json({
    success: false,
    status: status,
    message: message
  });
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  next();
};
exports["default"] = _default;