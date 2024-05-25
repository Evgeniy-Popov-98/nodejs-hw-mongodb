import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import

export const setupServer = () => {
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  const app = express();

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

	cosnt PORT = env(ENV_VARS)
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
