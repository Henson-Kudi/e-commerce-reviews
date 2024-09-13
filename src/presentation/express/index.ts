import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Server } from 'http';
import router from './routes';
import errorRequestHandler from './middlewares/errorHandler';
import envConf from '../../env.conf';
import { NODE_ENV } from '../../domain/enums/utils';
import AppError from '../../domain/valueObjects/appError';
import { ResponseCodes } from '../../domain/enums/responseCode';

const app = express();

const PORT = envConf.PORT;

app.use(
  cors({
    origin: '*', //Manage cors as you want
  })
);

app.use(express.json());

if (envConf.NODE_ENV !== NODE_ENV.PRODUCTION) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use(require('morgan')('dev')); // morgan for api route logging
}
// User must be authenticated before accessing this routes
app.use((req, res, next) => {
  if (!req.headers['user-id']) {
    next(new AppError('Unauthorised request', ResponseCodes.Forbidden));
  } else {
    next();
  }
});

const baseUrl = '/api/v1/reviews-service'; // change as you like

//
app.use(`${baseUrl}`, router);

// Attach error handler only attach all other route handlers
app.use(errorRequestHandler);

export default function startExpressServer(): {
  server: Server;
  app: express.Application;
} {
  const server = app.listen(PORT, () => {
    // Better to use a logger instead of just logging to console
    console.info(`Server running on: http://localhost:${PORT}`);
  });

  return {
    server,
    app,
  };
}
