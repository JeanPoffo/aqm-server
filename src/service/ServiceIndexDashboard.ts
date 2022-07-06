/* eslint-disable max-len */
import { Between } from 'typeorm';
import { sumAndDivide } from '../utils/numeric';
import { aqmDataSouce } from '../config/database';
import Station from '../models/Station';
import Data from '../models/Data';

interface Request {
  startDate: Date,

  endDate: Date,

  stationId: string | undefined,
}

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

interface Graph {
  name: string,

  dateRegister: Date,

  value: number,
}

interface Response {
  station: Station,
  data: DataResponse[],
  graph: Graph[],
  conama: {
    particulateMaterialTwoFive: number,
    carbonMonoxide: number,
    ozone: number,
  }
}

class ServiceIndexDashboard {
  public async execute({ startDate, endDate, stationId }: Request): Promise<Response[]> {
    const lastEightHours = new Date(endDate);
    lastEightHours.setHours(lastEightHours.getHours() - 8);

    const stationRepository = aqmDataSouce.getRepository(Station);
    const dataRepository = aqmDataSouce.getRepository(Data);

    const where = {
      isActive: true,
    };

    if (stationId) {
      Object.assign(where, { id: stationId });
    }

    const stations = await stationRepository.find({ where });

    const promiseReponses = stations.map(async (station) => {
      const dataTwentyFourHours = await dataRepository.find({
        relations: ['dataRaw'],
        where: {
          dataRaw: {
            station: { id: station.id },
            dateRegister: Between(startDate, endDate),
          },
        },
        order: {
          dataRaw: {
            dateRegister: 'DESC',
          },
        },
      });

      const dataEightHours = dataTwentyFourHours.filter(
        (actualData) => actualData.dataRaw.dateRegister >= lastEightHours,
      );

      return this.buildReponse(station, dataTwentyFourHours, dataEightHours);
    });

    const response = await Promise.all(promiseReponses);

    return response;
  }

  public async buildReponse(
    station: Station,
    dataTwentyFourHours: Data[],
    dataEightHours: Data[],
  ): Promise<Response> {
    const particulateMaterialTwoFive = Number(
      sumAndDivide(dataEightHours.flatMap((data) => data.particulateMaterialTwoFive)).toFixed(4),
    );

    const carbonMonoxide = Number(
      sumAndDivide(dataEightHours.flatMap((data) => data.carbonMonoxide)).toFixed(4),
    );

    const ozone = Number(
      sumAndDivide(dataEightHours.flatMap((data) => data.ozone)).toFixed(4),
    );

    const data = dataTwentyFourHours.flatMap((dataActual) => ({
      id: dataActual.id,
      dateRegister: dataActual.dataRaw.dateRegister,
      particulateMaterialTwoFive: Number(Number(dataActual.particulateMaterialTwoFive).toFixed(4)),
      carbonMonoxide: Number(Number(dataActual.carbonMonoxide).toFixed(4)),
      ozone: Number(Number(dataActual.ozone).toFixed(4)),
      temperature: Number(Number(dataActual.temperature).toFixed(2)),
      humidity: Number(Number(dataActual.humidity).toFixed(2)),
    }));

    const graph = this.buildGraph(dataTwentyFourHours);

    return {
      station,
      data,
      graph,
      conama: {
        particulateMaterialTwoFive,
        carbonMonoxide,
        ozone,
      },
    };
  }

  public buildGraph(dataGraph: Data[]): Graph[] {
    const allPeriods = dataGraph.map(({ dataRaw: { dateRegister } }) => ({
      day: dateRegister.getDay(),
      hours: dateRegister.getHours(),
    }));

    const periods = [...new Map(allPeriods.map((x) => [x.hours, x])).values()];

    const graphs: Graph[] = [];

    periods.forEach(({ day, hours }) => {
      const dataOfPeriod = dataGraph.filter(
        ({ dataRaw: { dateRegister } }) => dateRegister.getDay() === day && dateRegister.getHours() === hours,
      );

      console.log(day, hours);

      const { dateRegister } = dataOfPeriod[0].dataRaw;
      dateRegister.setMinutes(0);
      dateRegister.setSeconds(0);

      const graphParticulateMaterialTwoFive = {
        name: 'PM2.5',
        dateRegister,
        value: Number(
          sumAndDivide(dataOfPeriod.flatMap((data) => data.particulateMaterialTwoFive)).toFixed(4),
        ),
      };

      const graphCarbonMonoxide = {
        name: 'CO',
        dateRegister,
        value: Number(
          sumAndDivide(dataOfPeriod.flatMap((data) => data.carbonMonoxide)).toFixed(4),
        ),
      };

      const graphOzone = {
        name: 'O₃',
        dateRegister,
        value: Number(
          sumAndDivide(dataOfPeriod.flatMap((data) => data.ozone)).toFixed(4),
        ),
      };

      graphs.push(graphParticulateMaterialTwoFive);
      graphs.push(graphCarbonMonoxide);
      graphs.push(graphOzone);
    });

    return graphs;
  }
}

export default ServiceIndexDashboard;
