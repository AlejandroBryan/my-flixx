"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var directorsSchema = new _mongoose.Schema({
  Name: String,
  Biography: String,
  Birth: Date,
  Death: Date,
  Directing: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Movies'
  }]
});
var _default = (0, _mongoose.model)('Directors', directorsSchema);
exports["default"] = _default;