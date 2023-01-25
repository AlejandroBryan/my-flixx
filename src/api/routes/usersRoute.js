import { Router } from 'express';
import { asyncErrorHandler } from '../../utils/exceptions/asyncErrorHandler';
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

router.get('/', asyncErrorHandler(getAllUsers));
router.post('/register', asyncErrorHandler(registerUsers));
router.get('/:Username', asyncErrorHandler(getOneUserByName));
router.get('/:Id', asyncErrorHandler(getOneUserById));
router.put('/:Username', asyncErrorHandler(updateOneUser));
router.post('/:Username/movies/:MovieId', asyncErrorHandler(updateUserMovies));
router.delete('/:Username/movies/:MovieId', asyncErrorHandler(deleteUserMovies));
router.delete('/:Username', asyncErrorHandler(deleteOneUser));

export default router;
