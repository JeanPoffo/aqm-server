import { MoreThan } from 'typeorm';
import { sumAndDivide } from '../utils/numeric';
import { aqmDataSouce } from '../config/database';
import Station from '../models/Station';
import Data from '../models/Data';

/** Only Registered Data */
interface DataResponse {
  id: string,

  dateRegister: Date,

  particulateMaterialTwoFive: number,

  carbonMonoxide: number,

  ozone: number,

  temperature: number,

  humidity: number,
}

interface Response {
  station: Station,
  data: DataResponse[],
  conama: {
    particulateMaterialTwoFive: number,
    carbonMonoxide: number,
    ozone: number,
  }
}

class ServiceIndexDashboard {
  public async execute(): Promise<Response[]> {
    const lastTwentyFourHours = new Date();
    lastTwentyFourHours.setHours(lastTwentyFourHours.getHours() - 24);

    const lastEightHours = new Date();
    lastEightHours.setHours(lastEightHours.getHours() - 8);

    const stationRepository = aqmDataSouce.getRepository(Station);
    const dataRepository = aqmDataSouce.getRepository(Data);

    const stations = await stationRepository.find({ where: { isActive: true } });

    const promiseReponses = stations.map(async (station) => {
      const dataTwentyFourHours = await dataRepository.find({
        relations: ['dataRaw'],
        where: {
          dataRaw: {
            station: { id: station.id },
            createdAt: MoreThan(lastTwentyFourHours),
          },
        },
      });

      const dataEightHours = dataTwentyFourHours.filter(
        (actualData) => actualData.dataRaw.dateRegister >= lastEightHours,
      );
      const countTwentyFourHours = dataTwentyFourHours.length;
      const countEightHours = dataEightHours.length;

      const particulateMaterialTwoFive = sumAndDivide(
        dataTwentyFourHours.flatMap((data) => data.particulateMaterialTwoFive),
        countTwentyFourHours,
      );

      const carbonMonoxide = sumAndDivide(
        dataEightHours.flatMap((data) => data.carbonMonoxide),
        countEightHours,
      );

      const ozone = sumAndDivide(
        dataEightHours.flatMap((data) => data.ozone),
        countEightHours,
      );

      const data = dataTwentyFourHours.flatMap((dataActual) => ({
        id: dataActual.id,
        dateRegister: dataActual.dataRaw.dateRegister,
        particulateMaterialTwoFive: dataActual.particulateMaterialTwoFive,
        carbonMonoxide: dataActual.carbonMonoxide,
        ozone: dataActual.ozone,
        temperature: dataActual.temperature,
        humidity: dataActual.humidity,
      }));

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

    const response = await Promise.all(promiseReponses);

    return response;
  }
}

export default ServiceIndexDashboard;
