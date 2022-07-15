import { Request, Response } from 'express';
import ServiceDeleteStation from '../service/ServiceDeleteStation';
import ServiceIndexStation from '../service/ServiceIndexStation';
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;

    const serviceDeleteStation = new ServiceDeleteStation();

    await serviceDeleteStation.execute(id);

    return response.status(204).send();
  }

  public async index(_request: Request, response: Response): Promise<Response> {
    const serviceIndexStation = new ServiceIndexStation();

    const stations = await serviceIndexStation.execute();

    return response.json(stations);
  }
}

export default ControllerStation;
