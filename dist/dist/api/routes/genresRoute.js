"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _asyncErrorHandler = require("../../utils/exceptions/asyncErrorHandler");
var _genresController = require("../controller/genresController");
var router = (0, _express.Router)();
router.get('/', (0, _asyncErrorHandler.asyncErrorHandler)(_genresController.getAllGenres));
router.get('/:Name', (0, _asyncErrorHandler.asyncErrorHandler)(_genresController.getOneGenreByName));
router.get('/:Id', (0, _asyncErrorHandler.asyncErrorHandler)(_genresController.getOneGenreById));
router.post('/', (0, _asyncErrorHandler.asyncErrorHandler)(_genresController.createOneGenre));
router.put('/:Name', (0, _asyncErrorHandler.asyncErrorHandler)(_genresController.updateOneGenre));
router["delete"]('/:Id', (0, _asyncErrorHandler.asyncErrorHandler)(_genresController.deleteOneGenre));
var _default = router;
exports["default"] = _default;