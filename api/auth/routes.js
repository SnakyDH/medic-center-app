import Router from 'express';
import { verifyLogin } from './controller.js';
//Strategies
import passport from 'passport';
const router = Router();

router.post(
  '/login/',
  passport.authenticate('local', { session: false }),
  verifyLogin
);

export default router;
