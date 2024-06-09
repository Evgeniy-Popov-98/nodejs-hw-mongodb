import { SORT_ORDER } from '../constants/constants.js';
import { Contact } from '../db/models/contact.js';
import { createPaginationData } from '../utils/createPaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactQuery = Contact.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactCount = await Contact.find()
    .merge(contactQuery)
    .countDocuments();

  const contacts = await contactQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = createPaginationData(contactCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
