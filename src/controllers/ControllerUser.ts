import { Request, Response } from 'express';
import ServiceDeleteUser from '../service/ServiceDeleteUser';
import ServiceCreateUser from '../service/ServiceCreateUser';

class ControllerUser {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      login,
      password,
    } = request.body;

    const serviceCreateUser = new ServiceCreateUser();

    const user = await serviceCreateUser.execute({
      name,
      login,
      password,
    });

    delete user.password;

    return response.status(200).json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;

    const serviceDeleteUser = new ServiceDeleteUser();

    await serviceDeleteUser.execute(id);

    return response.status(204).send();
  }
}

export default ControllerUser;
