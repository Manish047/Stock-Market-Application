import { model, Schema, SchemaTypes, Document } from 'mongoose';
import { Models } from '../../constants';
import { IUserRole, UserRole } from './user-roles.types';

const userRoleSchema = new Schema(
  {
    title: {
      type: SchemaTypes.String,
      enum: Object.keys(UserRole),
      required: true,
    },
    // can have more details
  },
  { timestamps: true },
);

type UserRoleDocument = Document & IUserRole;
const UserRoleModel = model<UserRoleDocument>(Models.UserRole, userRoleSchema);

export default UserRoleModel;
