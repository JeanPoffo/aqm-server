import { Request, Response } from 'express';
import ServiceCreateSession from '../service/ServiceCreateSession';

class ControllerSession {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      login,
      password,
    } = request.params;

    const serviceCreateSession = new ServiceCreateSession();

    const { user, token } = await serviceCreateSession.execute({ login, password });

    delete user.password;

    return response.status(200).json({ user, token });
  }
}

export default ControllerSession;
