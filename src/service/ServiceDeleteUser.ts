import { aqmDataSouce } from '../config/database';
import User from '../models/User';

class ServiceDeleteUser {
  public async execute(id: string): Promise<void> {
    const userRepository = aqmDataSouce.getRepository(User);

    await userRepository.delete(id);
  }
}

export default ServiceDeleteUser;
