import mongoose from 'mongoose';
import { getAllContacts, getContactById } from '../servies/contacts';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  if (mongoose.isValidObjectId(contactId)) {
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: `Contact with id ${contactId} not found!`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } else {
    return res.status(404).json({
      status: 404,
      message: `Contact with id ${contactId} is not valid `,
    });
  }
};
