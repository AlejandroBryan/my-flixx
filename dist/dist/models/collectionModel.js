"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var collectionSchema = new _mongoose.Schema({
  Collection: String,
  Description: String,
  MethodGET: {
    Name: String,
    Url: String,
    Description: String
  },
  MethodPOST: {
    Name: String,
    Url: String,
    Description: String
  },
  MethodPUT: {
    Name: String,
    Url: String,
    Description: String
  },
  MethodDELETE: {
    Name: String,
    Url: String,
    Description: String
  }
});
var _default = (0, _mongoose.model)('Collection', collectionSchema);
exports["default"] = _default;