import { Router } from 'express';
import { asyncErrorHandler } from '../../utils/exceptions/asyncErrorHandler';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controller/index';

const router = Router();

router.get('/', asyncErrorHandler(getAll));
router.get('/:id', asyncErrorHandler(getOne));
router.post('/', asyncErrorHandler(createOne));
router.put('/:id', asyncErrorHandler(updateOne));
router.delete('/:id', asyncErrorHandler(deleteOne));

export default router;
