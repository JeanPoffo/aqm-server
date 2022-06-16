import { Request, Response } from 'express';
import ServiceCreateStation from '../service/ServiceCreateStation';

class ControllerStation {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
    } = request.body;

    const serviceCreateStation = new ServiceCreateStation();

    const station = await serviceCreateStation.execute({
      name,
      latitude,
      longitude,
    });

    return response.status(200).json(station);
  }
}

export default ControllerStation;
