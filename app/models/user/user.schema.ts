import { model, Schema, SchemaTypes, Document } from 'mongoose';
import { Models } from '../../constants';
import { IUser } from './user.types';

const userSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    email: {
      type: SchemaTypes.String,
      required: true,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
    role: {
      type: SchemaTypes.ObjectId,
      ref: Models.UserRole,
      required: true,
    },
    // can have more details
  },
  { timestamps: true },
);

type UserDocument = Document & IUser;
const UserModel = model<UserDocument>(Models.User, userSchema);

export default UserModel;
