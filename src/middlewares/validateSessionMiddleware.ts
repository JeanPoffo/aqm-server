import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';

const validateSessionMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is Missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, String(process.env.JWT_SECRET));

    request.user = {
      id: String(sub),
    };

    next();
  } catch (error) {
    throw new AppError('Invalid JWT Token', 401);
  }
};

export default validateSessionMiddleware;
