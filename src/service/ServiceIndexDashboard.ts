import { MoreThan } from 'typeorm';
import { aqmDataSouce } from '../config/database';
import Station from '../models/Station';
import Data from '../models/Data';

interface Request {
  startDate: Date
}

interface Response {
  station: Station,
  data: Data[],
  conama: {
    particulateMaterialTwoFive: number,
    carbonMonoxide: number,
    ozone: number,
  }
}

class ServiceIndexDashboard {
  public async execute({ startDate }: Request): Promise<Response[]> {
    const stationRepository = aqmDataSouce.getRepository(Station);
    const dataRepository = aqmDataSouce.getRepository(Data);

    const stations = await stationRepository.find({ where: { isActive: true } });

    const promiseReponses = stations.map(async (station) => {
      const [data, records] = await dataRepository.findAndCount({
        where: {
          dataRaw: {
            station: { id: station.id },
            createdAt: MoreThan(startDate),
          },
        },
      });

      const particulateMaterialTwoFive = data
        .map((d) => d.particulateMaterialTwoFive)
        .reduce((a, b) => a + b, 0) / records;

      const carbonMonoxide = data
        .map((d) => d.carbonMonoxide)
        .reduce((a, b) => a + b, 0) / records;

      const ozone = data
        .map((d) => d.ozone)
        .reduce((a, b) => a + b, 0) / records;

      return {
        station,
        data,
        conama: {
          particulateMaterialTwoFive,
          carbonMonoxide,
          ozone,
        },
      };
    });

    const response = Promise.all(promiseReponses);

    return response;
  }
}

export default ServiceIndexDashboard;
