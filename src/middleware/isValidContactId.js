import mongoose from 'mongoose';

export const isValidContactId = (req, res) => {
  const { contactId } = req.params;

  if (mongoose.isValidObjectId(contactId)) {
    return contactId;
  } else {
    res.status(404).json({
      status: 404,
      message: `Contact with id ${contactId} is not valid `,
    });
  }
};
