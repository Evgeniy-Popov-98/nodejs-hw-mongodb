import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import {
  getContactByIdController,
  getContactsController,
} from '../controllers/contacts';
import { createContact } from '../servies/contacts';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);

contactsRouter.get('/contacts', ctrlWrapper(createContactCo));

export default contactsRouter;
