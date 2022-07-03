import { aqmDataSouce } from '../config/database';
import Station from '../models/Station';

class ServiceIndexStation {
  public async execute(): Promise<Station[]> {
    const stationRepository = aqmDataSouce.getRepository(Station);

    const stations = await stationRepository.find();

    return stations;
  }
}

export default ServiceIndexStation;
