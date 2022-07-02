import { hash } from 'bcrypt';
import AppError from '../errors/AppError';
import { aqmDataSouce } from '../config/database';
import User from '../models/User';

interface Request {
  name: string,

  login: string,

  password: string
}

class ServiceCreateUser {
  public async execute({ name, login, password }: Request): Promise<User> {
    const userRepository = aqmDataSouce.getRepository(User);

    const existingUser = userRepository.findOne({ where: { login } });

    if (existingUser !== null) {
      throw new AppError('Login Already Exists', 409);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      login,
      password: hashedPassword,
    });

    return userRepository.save(user);
  }
}

export default ServiceCreateUser;
