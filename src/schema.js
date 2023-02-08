import { check } from 'express-validator';

export const userCreateSchema = [
  check('Firstname', 'Username is required').not().isEmpty(),
  check('Lastname', 'Lastname is required').not().isEmpty(),
  check('Username').isString().isAlphanumeric(),
  check('Password', 'Password must be a 8 characters long').not().isEmpty().isLength({ min: 8 }),
  check('Email', 'Email is required').not().isEmpty().isEmail(),
];

export const userUpdateSchema = [
  check('Firstname', 'Username is required').not().isEmpty(),
  check('Lastname', 'Lastname is required').not().isEmpty(),
  check('Username').isString().isAlphanumeric(),
  check('Password', 'Password must be a 8 characters long').not().isEmpty().isLength({ min: 8 }),
  check('Email', 'Email is required').not().isEmpty().isEmail(),
];
