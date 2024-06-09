import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  upsertsContact,
} from '../servies/contacts.js';
import createHttpError from 'http-errors';
import { isValidContactId } from '../middleware/isValidContactId.js';
import { parsePaginationPrams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationPrams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await getAllContacts({ page, perPage, sortBy, sortOrder });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const contactId = isValidContactId(req, res);

  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, { message: 'Contact not found' });
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { body } = req;
  const contact = await createContact(body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { body } = req;
  const contactId = isValidContactId(req, res);

  const contact = await upsertsContact(contactId, body);

  if (!contact.result) {
    throw createHttpError(404, { message: 'Contact not found' });
  }

  const status = contact.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully patched a contact!',
    data: contact.result,
  });
};

export const putContactController = async (req, res) => {
  const { body } = req;
  const contactId = isValidContactId(req, res);

  const contact = await upsertsContact(contactId, body, {
    upsert: true,
  });

  if (!contact.result) {
    throw createHttpError(404, { message: 'Contact not found' });
  }

  const status = contact.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted contact!',
    data: contact.result,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const contactId = isValidContactId(req, res);

  const contact = await deleteContactById(contactId);

  if (!contact) {
    throw createHttpError(404, { message: 'Contact not found' });
  }

  res.status(204).send();
};
