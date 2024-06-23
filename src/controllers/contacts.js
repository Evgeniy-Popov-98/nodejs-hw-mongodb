import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  upsertsContact,
} from '../servies/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationPrams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { CLOUDINARY } from '../constants/constants.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationPrams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const {
    params: { contactId },
    user: { _id: userId },
  } = req;

  const contact = await getContactById(contactId, userId);

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
  const { body, user, file } = req;
  const contact = await createContact({ ...body, photo: file }, user._id);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { body } = req;
  const {
    params: { contactId },
    user: { _id: userId },
  } = req;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env(CLOUDINARY.ENABLE_CLOUDINARY) === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await upsertsContact(contactId, userId, {
    ...body,
    photo: photoUrl,
  });

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
  const {
    params: { contactId },
    user: { _id: userId },
  } = req;

  const contact = await upsertsContact(contactId, userId, body, {
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
  const {
    params: { contactId },
    user: { _id: userId },
  } = req;

  const contact = await deleteContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, { message: 'Contact not found' });
  }

  res.status(204).send();
};
