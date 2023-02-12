import { Router } from 'express';
import { asyncErrorHandler } from '../../utils/exceptions/asyncErrorHandler';
import {
  getAllGenres,
  getOneGenreById,
  getOneGenreByName,
  createOneGenre,
  updateOneGenre,
  deleteOneGenre,
} from '../controller/genresController';

const router = Router();

router.get('/', asyncErrorHandler(getAllGenres));
router.get('/:Name', asyncErrorHandler(getOneGenreByName));
router.get('/:Id', asyncErrorHandler(getOneGenreById));
router.post('/', asyncErrorHandler(createOneGenre));
router.put('/:Name', asyncErrorHandler(updateOneGenre));
router.delete('/:Id', asyncErrorHandler(deleteOneGenre));

export default router;
