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
  addMovieUserImage,
  getMovieUserImageList,
  getMovieUserImage,
} from '../controller/usersController';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), asyncErrorHandler(getAllUsers));

router.post('/register', validate(userCreateSchema), asyncErrorHandler(registerUsers));

router.get('/:Username', asyncErrorHandler(getOneUserByName));

router.get('/:Id', passport.authenticate('jwt', { session: false }), asyncErrorHandler(getOneUserById));

router.put(
  '/:Username',
  passport.authenticate('jwt', { session: false }),
  validate(userCreateSchema),
  asyncErrorHandler(updateOneUser),
);

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

router.get(
  '/:movieId/userImages/:userId',
  passport.authenticate('jwt', { session: false }),
  asyncErrorHandler(getMovieUserImageList),
);

router.get(
  '/userImages/:objectKey',
  passport.authenticate('jwt', { session: false }),
  asyncErrorHandler(getMovieUserImage),
);

router.post(
  '/:movieId/userImages/:userId',
  passport.authenticate('jwt', { session: false }),
  asyncErrorHandler(addMovieUserImage),
);
export default router;
