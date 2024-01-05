"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userSchema = new _mongoose.Schema({
  Firstname: {
    type: String,
    required: true
  },
  Lastname: {
    type: String,
    required: true
  },
  Username: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Birthday: Date,
  FavoriteMovies: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Movies'
  }]
});
userSchema.statics.hashPassword = function (password) {
  return _bcrypt["default"].hashSync(password, 10);
};
userSchema.methods.validatePassword = function (password) {
  return _bcrypt["default"].compareSync(password, this.Password);
};
var _default = (0, _mongoose.model)('Users', userSchema);
exports["default"] = _default;