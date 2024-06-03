import { Contact } from '../db/models/contact.js';

export const getAllContacts = () => {
  return Contact.find();
};

export const getContactById = (id) => {
  const contact = Contact.findById(id);
  return contact;
};

export const createContact = (payload) => {
  const contact = Contact.create(payload);
  return contact;
};

export const upsertsContact = async (id, payload, options = {}) => {
  const result = await Contact.findByIdAndUpdate(id, payload, {
    new: true,
    includesResultMetadata: true,
    ...options,
  });

  return {
    result,
    isNew: !result?.lastErrorObject?.updatedExisting,
  };
};

export const deleteContactById = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);
  return result;
};
