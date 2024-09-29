import { NextFunction, Request, Response } from 'express';
import { CustomError, InternalServerError, NotFoundError } from '../utils/errors';
import { ResponseFactory } from '../utils/response';

export const notFoundMiddleware = (_request: Request, response: Response) => {
  response.status(404).send(new ResponseFactory(false, new NotFoundError('Route not found!')));
};

export const errorMiddleware = (
  error: CustomError | Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  console.error(error);
  if (error instanceof CustomError) {
    response.status(error.code).send(new ResponseFactory(false, error));
  } else {
    response.status(500).send(new ResponseFactory(false, new InternalServerError('Something went wrong!', error)));
  }
};
