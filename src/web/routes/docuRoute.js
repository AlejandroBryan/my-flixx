import { Router } from 'express';
import { asyncErrorHandler } from '../../utils/exceptions/asyncErrorHandler';
import {
  getDocumentation,
  welcome,
  editOne,
  createCollection,
  formCollection,
  getCollection,
  index,
} from '../controller/docuController';
const router = Router();

router.get('/', asyncErrorHandler(index));
router.get('/documentation', asyncErrorHandler(getCollection));
router.get('/documentation/:id', asyncErrorHandler(getCollection));
router.get('/create', asyncErrorHandler(formCollection));
router.post('/create', asyncErrorHandler(createCollection));
router.post('/edit/:id', asyncErrorHandler(editOne));
//router.put('/:Id', asyncErrorHandler(updateOneDirector));
//router.delete('/:Id', asyncErrorHandler(deleteOneDirector));

export default router;
