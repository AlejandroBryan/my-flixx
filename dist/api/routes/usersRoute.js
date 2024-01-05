"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _passport = _interopRequireDefault(require("passport"));
var _validator = _interopRequireDefault(require("../../utils/validations/validator"));
var _asyncErrorHandler = require("../../utils/exceptions/asyncErrorHandler");
var _schema = require("../../schema");
var _usersController = require("../controller/usersController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get('/', _passport["default"].authenticate('jwt', {
  session: false
}), (0, _asyncErrorHandler.asyncErrorHandler)(_usersController.getAllUsers));
router.post('/register', (0, _validator["default"])(_schema.userCreateSchema), (0, _asyncErrorHandler.asyncErrorHandler)(_usersController.registerUsers));
router.get('/:Username', (0, _asyncErrorHandler.asyncErrorHandler)(_usersController.getOneUserByName));
router.get('/:Id', _passport["default"].authenticate('jwt', {
  session: false
}), (0, _asyncErrorHandler.asyncErrorHandler)(_usersController.getOneUserById));
router.put('/:Username', _passport["default"].authenticate('jwt', {
  session: false
}), (0, _validator["default"])(_schema.userCreateSchema), (0, _asyncErrorHandler.asyncErrorHandler)(_usersController.updateOneUser));
router.post('/:Username/movies/:MovieId', _passport["default"].authenticate('jwt', {
  session: false
}), (0, _asyncErrorHandler.asyncErrorHandler)(_usersController.updateUserMovies));
router["delete"]('/:Username/movies/:MovieId', _passport["default"].authenticate('jwt', {
  session: false
}), (0, _asyncErrorHandler.asyncErrorHandler)(_usersController.deleteUserMovies));
router["delete"]('/:Username', _passport["default"].authenticate('jwt', {
  session: false
}), (0, _asyncErrorHandler.asyncErrorHandler)(_usersController.deleteOneUser));
router.get('/userImages/:userId', _passport["default"].authenticate('jwt', {
  session: false
}), (0, _asyncErrorHandler.asyncErrorHandler)(_usersController.UserImageList));

/* router.get(
  '/userImages/:objectKey',
  passport.authenticate('jwt', { session: false }),
  asyncErrorHandler(getMovieUserImage),
); */

router.post('/userImages/:userId', _passport["default"].authenticate('jwt', {
  session: false
}), (0, _asyncErrorHandler.asyncErrorHandler)(_usersController.addUserImage));
var _default = router;
exports["default"] = _default;