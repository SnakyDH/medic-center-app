import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import routes from './routes/general.routes.js';
import {
  logErrors,
  errorHandler,
  boomErrorHandler,
} from './middlewares/errorHandler.js';
import ePointNotFound from './middlewares/endPointNotFound.js';

import passport from 'passport';
import { localStrategy } from './utils/auth/strategies/local.strategy.js';
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

passport.use(localStrategy);
app.use(routes);
//middlewares
app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);
app.use(ePointNotFound);
app.listen(config.server.port, () => {
  console.log(`Server on port ${port}`);
});
