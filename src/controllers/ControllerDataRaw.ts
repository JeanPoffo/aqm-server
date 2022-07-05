import { Request, Response } from 'express';
import ServiceCreateDataRaw from '../service/ServiceCreateDataRaw';

class ControllerDataRaw {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      stationId,
      particulateMaterialTwoFive,
      particulateMaterialTen,
      carbonMonoxide,
      sulfurDioxide,
      nitrogenDioxide,
      ozone,
      temperature,
      humidity,
    } = request.body;

    const serviceCreateDataRaw = new ServiceCreateDataRaw();

    const dataRaw = await serviceCreateDataRaw.execute({
      stationId,
      particulateMaterialTwoFive,
      particulateMaterialTen,
      carbonMonoxide,
      sulfurDioxide,
      nitrogenDioxide,
      ozone,
      temperature,
      humidity,
    });

    return response.status(200).json(dataRaw);
  }
}

export default ControllerDataRaw;
