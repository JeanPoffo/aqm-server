import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { aqmDataSouce } from '../config/database';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  login: string,

  password: string
}

interface Response {
  user: User;

  token: string;
}

class ServiceCreateSession {
  public async execute({ login, password }: Request): Promise<Response> {
    const userRepository = aqmDataSouce.getRepository(User);

    const user = await userRepository.findOne({ where: { login } });

    if (user === null) {
      throw new AppError('Incorrect Login/Password', 401);
    }

    const isMatched = compare(password, String(user.password));

    if (!isMatched) {
      throw new AppError('Incorrect Login/Password', 401);
    }

    const token = sign({}, String(process.env.JWT_SECRET), {
      subject: user.id,
      expiresIn: '30d',
    });

    return {
      user,
      token,
    };
  }
}

export default ServiceCreateSession;
