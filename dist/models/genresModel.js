"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var genresSchema = new _mongoose.Schema({
  Name: {
    type: String,
    unique: true
  },
  Description: {
    type: String,
    unique: true
  },
  MoviesList: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Movies'
  }]
});
var _default = (0, _mongoose.model)('Genres', genresSchema);
exports["default"] = _default;