import Router from 'express';
import { getQuestion, validateAnswer } from './controller.js';
const router = Router();

router.get('/recovery/:cc', getQuestion);
router.put('/recovery/validate', validateAnswer);

export default router;
