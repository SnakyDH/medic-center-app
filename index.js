import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import routes from './routes/general.routes.js';
const app = express();
const port = config.server.port;

const corsOptions = {
  origin: '*', // todo: change origin credentials for production
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);
app.listen(config.server.port, () => {
  console.log(`Server on port ${port}`);
});
