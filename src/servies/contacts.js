import createHttpError from 'http-errors';
import { Contact } from '../db/models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  const contact = await Contact.findById(id);

  if (!contact) {
    throw createHttpError(404, { message: 'Contact not found' });
  }
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);

  return contact;
};

export const upsertsContact = async (id, payload, options = {}) => {
  const result = await Contact.findByIdAndUpdate(id, payload, {
    new: true,
    includesResultMetadata: true,
    ...options,
  });

  if (!result && !result.value) {
    throw createHttpError(404, { message: 'Contact not found' });
  }

  return {
    contact: result.value,
    isNew: !result?.lastErrorObject?.updatedExisting,
  };
};
export const deleteContactById = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw createHttpError(404, { message: 'Contact not found' });
  }
};
