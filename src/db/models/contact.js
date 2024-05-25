const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
  {
    name: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'persona'],
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Contact = model('contact', contactSchema);
