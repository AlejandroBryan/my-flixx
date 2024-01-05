"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _validator = _interopRequireDefault(require("../../utils/validations/validator"));
var _schema = require("../../schema");
var _asyncErrorHandler = require("../../utils/exceptions/asyncErrorHandler");
var _moviesController = require("../controller/moviesController");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var router = (0, _express.Router)();
router.get('/', (0, _asyncErrorHandler.asyncErrorHandler)(_moviesController.getAllMovies));
router.get('/:Title', (0, _asyncErrorHandler.asyncErrorHandler)(_moviesController.getOneMovie));
router.get('/directors/:Directors', (0, _asyncErrorHandler.asyncErrorHandler)(_moviesController.getOneMovieByDirectors));
router.get('/:Id', (0, _asyncErrorHandler.asyncErrorHandler)(_moviesController.getOneMovieById));
router.post('/', (0, _validator["default"])(_schema.moviesSchema), (0, _asyncErrorHandler.asyncErrorHandler)(_moviesController.createOneMovie));
router.put('/:Title', (0, _validator["default"])(_schema.moviesSchema), (0, _asyncErrorHandler.asyncErrorHandler)(_moviesController.updateOneMovie));
router.put('/:Title/:Genres', (0, _asyncErrorHandler.asyncErrorHandler)(_moviesController.updateGenreMovie));
router["delete"]('/:Title', (0, _asyncErrorHandler.asyncErrorHandler)(_moviesController.deleteOneMovie));
var _default = router;
exports["default"] = _default;