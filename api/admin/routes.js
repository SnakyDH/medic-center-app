import Router from 'express';
import { getAdmin, createAdmin } from './controller.js';
const router = Router();
router.get('/admin/:id', getAdmin);
router.post('/admins/', createAdmin);
export default router;
