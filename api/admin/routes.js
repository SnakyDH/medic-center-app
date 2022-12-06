import Router from 'express';
import { getAdmin } from './controller.js';
const router = Router();
router.get('/admin/:id', getAdmin);

export default router;
