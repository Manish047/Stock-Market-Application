import { sign } from 'jsonwebtoken';
import { UnauthorizedError } from '../../utils/errors';
import { verifyPassword } from '../../utils/password';
import userRepo from './user.repo';

const loginUser = async (email: string, password: string) => {
  const [user] = await userRepo.findUsers({ email });
  if (!user) {
    throw new UnauthorizedError("User doesn't exists!");
  }
  const passwordsMatch = await verifyPassword(password, user.password);
  if (!passwordsMatch) {
    throw new UnauthorizedError('Invalid user password!');
  }
  const token = sign(user.toObject(), process.env.JWT_SECRET ?? '', { expiresIn: 3600 });
  return { token, expiresIn: 3600 };
};

export default {
  loginUser,
};
