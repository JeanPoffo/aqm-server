import { aqmDataSouce } from '../config/database';
import Station from '../models/Station';
import DataRaw from '../models/DataRaw';
import Data from '../models/Data';
import ServiceConvertParticulateMaterialTwoFive from './converters/ServiceConvertParticulateMaterialTwoFive';
import ServiceConvertCarbonMonoxide from './converters/ServiceConvertCarbonMonoxide';
import ServiceConvertOzone from './converters/ServiceConvertOzone';

interface Request {
  stationId: string

  dateRegister: Date;

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
    const serviceConvertParticulateMaterialTwoFive = new ServiceConvertParticulateMaterialTwoFive();
    const serviceConvertCarbonMonoxide = new ServiceConvertCarbonMonoxide();
    const serviceConvertOzone = new ServiceConvertOzone();

    const station = await stationRepository.findOne({ where: { id: stationId } });

    if (!station) {
      throw new Error('Station Not Found');
    }

    const dataRaw = dataRawRepository.create({
      station,
      ...restDataRaw,
    });

    const {
      id,
      particulateMaterialTwoFive,
      carbonMonoxide,
      ozone,
      ...restData
    } = await dataRawRepository.save(dataRaw);

    const data = dataRepository.create({
      dataRaw: {
        id,
      },
      particulateMaterialTwoFive: serviceConvertParticulateMaterialTwoFive.execute(
        particulateMaterialTwoFive,
      ),
      carbonMonoxide: serviceConvertCarbonMonoxide.execute(
        carbonMonoxide,
      ),
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
