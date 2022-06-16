import { Request, Response } from 'express';
import ServiceIndexDashboard from '../service/ServiceIndexDashboard';

class ControllerDashboard {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      startDate,
    } = request.params;

    const serviceIndexDashboard = new ServiceIndexDashboard();

    const dataDashboard = serviceIndexDashboard.execute({
      startDate: new Date(startDate),
    });

    return response.json(dataDashboard);
  }
}

export default ControllerDashboard;
