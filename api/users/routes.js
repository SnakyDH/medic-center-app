import Router from 'express';
import { updatePassword } from './controller.js';
const router = Router();

router.put('/user/:cc', updatePassword);

export default router;
