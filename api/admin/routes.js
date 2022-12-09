import Router from 'express';
import { getAdmin, createAdmin, updateAdmin } from './controller.js';
const router = Router();
router.get('/admin/:id', getAdmin);
router.post('/admins/', createAdmin);
router.put('/admin/:id', updateAdmin);
export default router;
