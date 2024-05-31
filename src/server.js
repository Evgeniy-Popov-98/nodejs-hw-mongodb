import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/constants.js';
import { notFoudMiddleware } from './middleware/notFoudMiddleware.js';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';
import contactsRouter from './routers/contacts.js';

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

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '1mb',
    }),
  );

  app.use(contactsRouter);

  app.use(notFoudMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
