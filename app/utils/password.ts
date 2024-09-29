import { hash, compare, genSalt } from 'bcryptjs';

export const encodePassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};
