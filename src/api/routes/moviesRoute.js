import { Router } from 'express';
import { asyncErrorHandler } from '../../utils/exceptions/asyncErrorHandler';
import {
  getAllMovies,
  getOneMovieById,
  getOneMovie,
  createOneMovie,
  updateOneMovie,
  deleteOneMovie,
} from '../controller/moviesController';

const router = Router();

router.get('/', asyncErrorHandler(getAllMovies));
router.get('/:Title', asyncErrorHandler(getOneMovie));
router.get('/:Directors', asyncErrorHandler(getOneMovie));
router.get('/:Id', asyncErrorHandler(getOneMovieById));
router.post('/', asyncErrorHandler(createOneMovie));
router.put('/:Id', asyncErrorHandler(updateOneMovie));
router.delete('/:Id', asyncErrorHandler(deleteOneMovie));

export default router;
