import { Request, Response } from 'express';
import ServiceIndexDashboard from '../service/ServiceIndexDashboard';

class ControllerDashboard {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      startDate,
      endDate,
      stationId,
    } = request.query;

    const serviceIndexDashboard = new ServiceIndexDashboard();

    const dataDashboard = await serviceIndexDashboard.execute({
      startDate: new Date(String(startDate)),
      endDate: new Date(String(endDate)),
      stationId: stationId ? String(stationId) : undefined,
    });

    return response.json(dataDashboard);
  }
}

export default ControllerDashboard;
