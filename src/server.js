import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/constants.js';
import { getAllContacts, getContactById } from './servies/contacts.js';
import {
  notFoudMiddleware,
  errorHandlerMiddleware,
} from './middleware/notFoudMiddleware.js';

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

  app.get('/contacts', async (req, res, next) => {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully get all contacts',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const id = req.params.contactId;
    const contact = await getContactById(id);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: `Contact with id ${id} not found!`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully get contact with id ${id}!`,
      data: contact,
    });
  });

  app.use(notFoudMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
