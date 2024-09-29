import UserModel from './user.schema';

const findUsers = (filters: Record<string, any>, projection: Record<string, number> = {}) =>
  UserModel.find(filters).select(projection);

export default {
  findUsers,
};
