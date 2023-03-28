import { check } from 'express-validator';

export const userCreateSchema = [
  check('Firstname', 'Username is required').not().isEmpty(),
  check('Lastname', 'Lastname is required').not().isEmpty(),
  check('Username').isString(),
  check('Password', 'Password must be a 8 characters long').not().isEmpty().isLength({ min: 8 }),
  check('Email', 'Email is required').not().isEmpty().isEmail(),
];

export const moviesSchema = [
  check('Title', 'Title is required').not().isEmpty().isString(),
  check('Description', 'Description is required').not().isEmpty().isString(),
  check('Genres', 'Should be a string of alphanumeric characters').isEmpty().isArray(), // change to alphanumeric later
  check('Director', 'Director is required').not().isEmpty(),
  check('Actors', 'Action is required').isArray(),
  check('ImagePath', 'Should be a string').isString(),
  check('Featured', 'Should be a boolean').isBoolean(),
];
