import { Request, Response } from 'express';
import ServiceCreateDataRaw from '../service/ServiceCreateDataRaw';

class ControllerdataRaw {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      station_id,
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
      station_id,
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

export default ControllerdataRaw;
