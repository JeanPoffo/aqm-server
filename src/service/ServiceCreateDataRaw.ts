import { aqmDataSouce } from '../config/database';
import Station from '../models/Station';
import DataRaw from '../models/DataRaw';

interface Request {
  station_id: string

  particulateMaterialTwoFive: number

  particulateMaterialTen: number

  carbonMonoxide: number

  sulfurDioxide: number

  nitrogenDioxide: number

  ozone: number

  temperature: number

  humidity: number
}

class ServiceCreateDataRaw {
  public async execute({ station_id, ...data }: Request): Promise<DataRaw> {
    const stationRepository = aqmDataSouce.getRepository(Station);
    const dataRawRepository = aqmDataSouce.getRepository(DataRaw);

    const station = await stationRepository.findOne({ where: { id: station_id } });

    if (!station) {
      throw new Error('Station Not Found');
    }

    const dataRaw = dataRawRepository.create({
      station,
      ...data,
    });

    return dataRawRepository.save(dataRaw);
  }
}

export default ServiceCreateDataRaw;
