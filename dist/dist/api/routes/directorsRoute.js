"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _asyncErrorHandler = require("../../utils/exceptions/asyncErrorHandler");
var _directorsController = require("../controller/directorsController");
var router = (0, _express.Router)();
router.get('/', (0, _asyncErrorHandler.asyncErrorHandler)(_directorsController.getAllDirectors));
router.get('/:Name', (0, _asyncErrorHandler.asyncErrorHandler)(_directorsController.getOneDirectorByName));
router.get('/:Id', (0, _asyncErrorHandler.asyncErrorHandler)(_directorsController.getOneDirectorById));
router.post('/', (0, _asyncErrorHandler.asyncErrorHandler)(_directorsController.createOneDirector));
router.put('/:Id', (0, _asyncErrorHandler.asyncErrorHandler)(_directorsController.updateOneDirector));
router["delete"]('/:Id', (0, _asyncErrorHandler.asyncErrorHandler)(_directorsController.deleteOneDirector));
var _default = router;
exports["default"] = _default;