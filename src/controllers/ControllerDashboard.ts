import { Request, Response } from 'express';
import ServiceIndexDashboard from '../service/ServiceIndexDashboard';

class ControllerDashboard {
  public async index(_request: Request, response: Response): Promise<Response> {
    const serviceIndexDashboard = new ServiceIndexDashboard();

    const dataDashboard = await serviceIndexDashboard.execute();

    return response.json(dataDashboard);
  }
}

export default ControllerDashboard;
