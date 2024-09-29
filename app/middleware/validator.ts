import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestError } from '../utils/errors';

export const validate = (request: Request, _response: Response, next: NextFunction) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    next(new BadRequestError(errors.array()));
  }
  next();
};
