"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var moviesSchema = new _mongoose.Schema({
  Title: {
    type: String,
    required: true,
    unique: true
  },
  Description: {
    type: String,
    required: true
  },
  Released_year: {
    type: String,
    required: false
  },
  Runtime: String,
  Genres: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Genres'
  }],
  Director: [{
    Name: String,
    Biography: String,
    Birth: Date,
    Death: Date
  }],
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});
var _default = (0, _mongoose.model)('Movies', moviesSchema);
exports["default"] = _default;