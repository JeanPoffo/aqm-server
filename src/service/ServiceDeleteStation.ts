import { aqmDataSouce } from '../config/database';
import Station from '../models/Station';

class ServiceDeleteStation {
  public async execute(id: string): Promise<void> {
    const stationRepository = aqmDataSouce.getRepository(Station);

    await stationRepository.delete(id);
  }
}

export default ServiceDeleteStation;
