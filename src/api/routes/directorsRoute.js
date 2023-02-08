import { Router } from 'express';
import { asyncErrorHandler } from '../../utils/exceptions/asyncErrorHandler';
import {
  getAllDirectors,
  getOneDirectorByName,
  getOneDirectorById,
  updateOneDirector,
  createOneDirector,
  deleteOneDirector,
} from '../controller/directorsController';
const router = Router();

router.get('/', asyncErrorHandler(getAllDirectors));
router.get('/:Name', asyncErrorHandler(getOneDirectorByName));
router.get('/:Id', asyncErrorHandler(getOneDirectorById));
router.post('/', asyncErrorHandler(createOneDirector));
router.put('/:Id', asyncErrorHandler(updateOneDirector));
router.delete('/:Id', asyncErrorHandler(deleteOneDirector));

export default router;
