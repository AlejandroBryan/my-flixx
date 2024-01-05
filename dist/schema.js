"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userCreateSchema = exports.moviesSchema = void 0;
var _expressValidator = require("express-validator");
var userCreateSchema = [(0, _expressValidator.check)('Firstname', 'Username is required').not().isEmpty(), (0, _expressValidator.check)('Lastname', 'Lastname is required').not().isEmpty(), (0, _expressValidator.check)('Username').isString(), (0, _expressValidator.check)('Password', 'Password must be a 8 characters long').not().isEmpty().isLength({
  min: 8
}), (0, _expressValidator.check)('Email', 'Email is required').not().isEmpty().isEmail()];
exports.userCreateSchema = userCreateSchema;
var moviesSchema = [(0, _expressValidator.check)('Title', 'Title is required').not().isEmpty().isString(), (0, _expressValidator.check)('Description', 'Description is required').not().isEmpty().isString(), (0, _expressValidator.check)('Genres', 'Should be a string of alphanumeric characters').isEmpty().isArray(),
// change to alphanumeric later
(0, _expressValidator.check)('Director', 'Director is required').not().isEmpty(), (0, _expressValidator.check)('Actors', 'Action is required').isArray(), (0, _expressValidator.check)('ImagePath', 'Should be a string').isString(), (0, _expressValidator.check)('Featured', 'Should be a boolean').isBoolean()];
exports.moviesSchema = moviesSchema;