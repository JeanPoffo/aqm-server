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

interface Graphs {

  particulateMaterialTwoFive: Graph[],

  carbonMonoxide: Graph[],

  ozone: Graph[],

  temperature: Graph[],

  humidity: Graph[],
}

interface Response {
  station: Station,

  data: DataResponse[],

  graphs: Graphs,

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

    const lastSixteenHours = new Date(endDate);
    lastSixteenHours.setHours(lastSixteenHours.getHours() - 8);

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

      const dataMovingAverageOne = dataTwentyFourHours.filter(
        (actualData) => actualData.dataRaw.dateRegister >= lastEightHours,
      );

      const dataMovingAverageTwo = dataTwentyFourHours.filter(
        (actualData) => actualData.dataRaw.dateRegister >= lastSixteenHours && actualData.dataRaw.dateRegister < lastEightHours,
      );

      const dataMovingAverageThree = dataTwentyFourHours.filter(
        (actualData) => actualData.dataRaw.dateRegister < lastSixteenHours,
      );

      const particulateMaterialTwoFive = Number(
        sumAndDivide([
          sumAndDivide(dataMovingAverageOne.flatMap((data) => data.particulateMaterialTwoFive)),
          sumAndDivide(dataMovingAverageTwo.flatMap((data) => data.particulateMaterialTwoFive)),
          sumAndDivide(dataMovingAverageThree.flatMap((data) => data.particulateMaterialTwoFive)),
        ]).toFixed(4),
      );

      const carbonMonoxide = Number(
        sumAndDivide([
          sumAndDivide(dataMovingAverageOne.flatMap((data) => data.carbonMonoxide)),
          sumAndDivide(dataMovingAverageTwo.flatMap((data) => data.carbonMonoxide)),
          sumAndDivide(dataMovingAverageThree.flatMap((data) => data.carbonMonoxide)),
        ]).toFixed(4),
      );

      const ozone = Number(
        sumAndDivide([
          sumAndDivide(dataMovingAverageOne.flatMap((data) => data.ozone)),
          sumAndDivide(dataMovingAverageTwo.flatMap((data) => data.ozone)),
          sumAndDivide(dataMovingAverageThree.flatMap((data) => data.ozone)),
        ]).toFixed(4),
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

      const graphs = this.buildGraph(dataTwentyFourHours);

      return {
        station,
        data,
        graphs,
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

  public buildGraph(dataGraph: Data[]): Graphs {
    const allPeriods = dataGraph.map(({ dataRaw: { dateRegister } }) => ({
      day: dateRegister.getDay(),
      hours: dateRegister.getHours(),
    }));

    const periods = [...new Map(allPeriods.map((x) => [x.hours, x])).values()];

    periods.sort((a, b) => Number(`${a.day}${a.hours}`) - Number(`${b.day}${b.hours}`));

    const graphs: Graphs = {
      particulateMaterialTwoFive: [],
      carbonMonoxide: [],
      ozone: [],
      temperature: [],
      humidity: [],
    };

    periods.forEach(({ day, hours }) => {
      const dataOfPeriod = dataGraph.filter(
        ({ dataRaw: { dateRegister } }) => dateRegister.getDay() === day && dateRegister.getHours() === hours,
      );

      const dateRegister = new Date(dataOfPeriod[0].dataRaw.dateRegister);
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

      const graphTemperature = {
        name: 'Temperatura',
        dateRegister,
        value: Number(
          sumAndDivide(dataOfPeriod.flatMap((data) => data.temperature)).toFixed(2),
        ),
      };

      const graphHumidity = {
        name: 'Umidade',
        dateRegister,
        value: Number(
          sumAndDivide(dataOfPeriod.flatMap((data) => data.humidity)).toFixed(2),
        ),
      };

      graphs.particulateMaterialTwoFive.push(graphParticulateMaterialTwoFive);
      graphs.carbonMonoxide.push(graphCarbonMonoxide);
      graphs.ozone.push(graphOzone);
      graphs.temperature.push(graphTemperature);
      graphs.humidity.push(graphHumidity);
    });

    return graphs;
  }
}

export default ServiceIndexDashboard;
