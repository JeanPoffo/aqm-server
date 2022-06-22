import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import { errorMessage } from '../utils/console';

const errorHandler = async (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Promise<Response> => {
  errorMessage(error.message);

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
};

export default errorHandler;
