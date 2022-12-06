import { config } from '../config/config.js';

export const checkApi = (req, res, next) => {
  const apiKey = req.headers['api'];
  if (apiKey === config.server.apiKey) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
