import { NextFunction, Request, Response } from 'express';

export const tryCatchWrapper = (callback: (request: Request, response: Response) => Promise<Response>) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await callback(request, response);
    } catch (error) {
      next(error);
    }
  };
};
