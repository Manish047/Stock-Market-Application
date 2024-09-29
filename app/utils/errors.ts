export class CustomError {
  code: number;
  message: string;
  info: any;
  constructor(info: any, error?: Error) {
    if (error) {
      console.error(JSON.stringify(error));
    }
    this.info = info;
  }
}

export class NotFoundError extends CustomError {
  code = 404;
  message = 'Not Found';
}

export class BadRequestError extends CustomError {
  code = 400;
  message = 'Bad Request';
}

export class InternalServerError extends CustomError {
  code = 500;
  message = 'Internal Server Error';
}

export class UnauthorizedError extends CustomError {
  code = 401;
  message = 'Unauthorized';
}

export class ForbiddenError extends CustomError {
  code = 403;
  message = 'Forbidden';
}
