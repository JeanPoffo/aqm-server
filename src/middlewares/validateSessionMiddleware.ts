import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';

interface TokenPaylod {
  iat: number;
  exp: number;
  sub: string;
}

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
    const { sub } = verify(token, String(process.env.JWT_SECRET)) as TokenPaylod;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token', 401);
  }
};

export default validateSessionMiddleware;
