import { Router } from 'express';
import passport from 'passport';
import validate from '../../utils/validations/validator';
import { asyncErrorHandler } from '../../utils/exceptions/asyncErrorHandler';
import { userCreateSchema } from '../../schema';
import {
  getAllUsers,
  registerUsers,
  getOneUserById,
  getOneUserByName,
  updateOneUser,
  deleteOneUser,
  updateUserMovies,
  deleteUserMovies,
} from '../controller/usersController';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), asyncErrorHandler(getAllUsers));

router.post('/register', validate(userCreateSchema), asyncErrorHandler(registerUsers));

router.get('/:Username', passport.authenticate('jwt', { session: false }), asyncErrorHandler(getOneUserByName));

router.get('/:Id', asyncErrorHandler(getOneUserById));

router.put('/:Username', passport.authenticate('jwt', { session: false }), asyncErrorHandler(updateOneUser));

router.post(
  '/:Username/movies/:MovieId',
  passport.authenticate('jwt', { session: false }),
  asyncErrorHandler(updateUserMovies),
);

router.delete(
  '/:Username/movies/:MovieId',
  passport.authenticate('jwt', { session: false }),
  asyncErrorHandler(deleteUserMovies),
);

router.delete('/:Username', passport.authenticate('jwt', { session: false }), asyncErrorHandler(deleteOneUser));

export default router;
