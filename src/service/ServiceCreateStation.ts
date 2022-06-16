import { aqmDataSouce } from '../config/database';
import Station from '../models/Station';

interface Request {
  name: string

  latitude: number

  longitude: number
}

class ServiceCreateStation {
  public async execute(data: Request): Promise<Station> {
    const stationRepository = aqmDataSouce.getRepository(Station);

    const station = stationRepository.create({
      ...data,
    });

    return stationRepository.save(station);
  }
}

export default ServiceCreateStation;
