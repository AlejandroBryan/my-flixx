"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncErrorHandler = void 0;
var asyncErrorHandler = function asyncErrorHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next))["catch"](next);
  };
};
exports.asyncErrorHandler = asyncErrorHandler;