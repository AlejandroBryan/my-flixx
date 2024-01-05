"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _asyncErrorHandler = require("../../utils/exceptions/asyncErrorHandler");
var _docuController = require("../controller/docuController");
var router = (0, _express.Router)();
router.get('/', (0, _asyncErrorHandler.asyncErrorHandler)(_docuController.index));
router.get('/documentation', (0, _asyncErrorHandler.asyncErrorHandler)(_docuController.getCollection));
router.get('/documentation/:id', (0, _asyncErrorHandler.asyncErrorHandler)(_docuController.getCollection));
router.get('/create', (0, _asyncErrorHandler.asyncErrorHandler)(_docuController.formCollection));
router.post('/create', (0, _asyncErrorHandler.asyncErrorHandler)(_docuController.createCollection));
router.post('/edit/:id', (0, _asyncErrorHandler.asyncErrorHandler)(_docuController.editOne));
//router.put('/:Id', asyncErrorHandler(updateOneDirector));
//router.delete('/:Id', asyncErrorHandler(deleteOneDirector));
var _default = router;
exports["default"] = _default;