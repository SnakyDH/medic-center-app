import Router from 'express';
import { getQuestion } from './controller.js';
const router = Router();

router.get('/recovery/:cc', getQuestion);

export default router;
