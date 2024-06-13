import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJson = function () {
  const object = this.toObject();
  delete object.password;
  return object;
};

export const User = model('users', userSchema);
