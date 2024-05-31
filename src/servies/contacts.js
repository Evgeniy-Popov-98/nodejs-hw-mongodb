import createHttpError from 'http-errors';
import { Contact } from '../db/models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  const data = await Contact.findById(id);
  return data;
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

  if (!result || !result.value) {
    throw createHttpError(404, 'Contact not foud');
  }

  return {
    contact: result.value,
    isNew: !result?.lastErrorObject?.updatedExisting,
  };
};
export const deleteContactById = async (contactId) => {
  await Contact.findByIdAndDelete(contactId);
};
