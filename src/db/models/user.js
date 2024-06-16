import { Schema, model } from 'mongoose';
import { ROLES } from '../../constants/constants.js';

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: {
      type: String,
      default: ROLES.USER,
      enum: [ROLES.USER, ROLES.ADMIN],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const object = this.toObject();
  delete object.password;
  return object;
};

export const User = model('users', userSchema);
