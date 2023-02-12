import { Router } from 'express';
import validator from '../../utils/validations/validator';
import { moviesSchema } from '../../schema';
import { asyncErrorHandler } from '../../utils/exceptions/asyncErrorHandler';
import {
  getAllMovies,
  getOneMovieById,
  getOneMovieByDirectors,
  getOneMovie,
  createOneMovie,
  updateOneMovie,
  deleteOneMovie,
  updateGenreMovie,
} from '../controller/moviesController';

const router = Router();

router.get('/', asyncErrorHandler(getAllMovies));
router.get('/:Title', asyncErrorHandler(getOneMovie));
router.get('/directors/:Directors', asyncErrorHandler(getOneMovieByDirectors));
router.get('/:Id', asyncErrorHandler(getOneMovieById));
router.post('/', validator(moviesSchema), asyncErrorHandler(createOneMovie));
router.put('/:Title', asyncErrorHandler(updateOneMovie));
router.put('/:Title/:Genres', asyncErrorHandler(updateGenreMovie));
router.delete('/:Title', asyncErrorHandler(deleteOneMovie));

export default router;
