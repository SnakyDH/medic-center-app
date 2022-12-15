import Router from 'express';
import {
  getAdmin,
  createAdmin,
  updateAdmin,
  updatePassword,
} from './controller.js';
const router = Router();
router.get('/admin/:id', getAdmin);
router.post('/admins/', createAdmin);
router.put('/admin/:id/password', updatePassword);
router.put('/admin/:id', updateAdmin);
export default router;
