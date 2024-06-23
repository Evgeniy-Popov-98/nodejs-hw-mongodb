import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS, UPLOAD_DIR } from './constants/constants.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use(cookieParser());

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '1mb',
    }),
  );

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.use('/uploads', express.static(UPLOAD_DIR));

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
