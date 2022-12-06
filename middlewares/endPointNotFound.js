import Router from 'express';
const router = Router();
router.use((req, res, next) => {
  res.status(404).json({ message: 'endpoint not found' });
});

export default router;
