import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    email: { type: String, require: false },
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
    versionKey: false,
  },
);

export const Contact = model('contacts', contactSchema);
