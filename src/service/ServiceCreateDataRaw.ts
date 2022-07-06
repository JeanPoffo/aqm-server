import { aqmDataSouce } from '../config/database';
import AppError from '../errors/AppError';
import Station from '../models/Station';
import DataRaw from '../models/DataRaw';
import Data from '../models/Data';
import ServiceConvertOzone from './converters/ServiceConvertOzone';

interface Request {
  stationId: string

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
  public async execute({ stationId, ...restDataRaw }: Request): Promise<DataRaw> {
    const stationRepository = aqmDataSouce.getRepository(Station);
    const dataRawRepository = aqmDataSouce.getRepository(DataRaw);
    const dataRepository = aqmDataSouce.getRepository(Data);
    const serviceConvertOzone = new ServiceConvertOzone();

    const station = await stationRepository.findOne({ where: { id: stationId } });

    if (!station) {
      throw new AppError('Station Not Found');
    }

    const dataRaw = dataRawRepository.create({
      station,
      ...restDataRaw,
    });

    const {
      id,
      ozone,
      ...restData
    } = await dataRawRepository.save(dataRaw);

    const data = dataRepository.create({
      dataRaw: {
        id,
      },
      ozone: serviceConvertOzone.execute(
        ozone,
      ),
      ...restData,
    });

    await dataRepository.save(data);

    return dataRaw;
  }
}

export default ServiceCreateDataRaw;
