import express from 'express';
import { config } from './config/config.js';
const app = express();

app.get('/', (req, res) => {
  res.send('Server in operation');
});
app.listen(config.server.port, () => {
  console.log(`Server in port ${config.server.port}`);
});
