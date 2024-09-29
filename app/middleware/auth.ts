import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '../utils/errors';
import { verify } from 'jsonwebtoken';
import { unrestrictedPaths } from '../routes/config';

export const isPermitted = (allowedRoles: string[]) => {
  return async (_request: Request, response: Response, next: NextFunction) => {
    try {
      if (!response.locals.user || !allowedRoles.includes(response.locals.user.role)) {
        throw new ForbiddenError('Unauthorized to access this resource!');
      }
      return next();
    } catch (error) {
      next(error);
    }
  };
};

export const authorize = (request: Request, response: Response, next: NextFunction) => {
  try {
    if (unrestrictedPaths.findIndex((route) => route.method === request.method && route.path === request.path) > -1) {
      return next();
    }
    if (!request.headers.authorization) {
      throw new UnauthorizedError('Missing token!');
    }
    try {
      const user = verify(request.headers.authorization.replace('Bearer ', '') ?? '', process.env.JWT_SECRET ?? '');
      response.locals.user = user;
    } catch (error: any) {
      if (error.toString().includes('TokenExpiredError')) {
        throw new UnauthorizedError('Token expired!');
      }
      throw error;
    }
    return next();
  } catch (error) {
    next(error);
  }
};
