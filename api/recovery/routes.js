import Router from 'express';
import { getQuestion, validateAnswer } from './controller.js';
const router = Router();

router.get('/recovery/:cc', getQuestion);
router.get('/recovery/validate/:cc', validateAnswer);

export default router;
