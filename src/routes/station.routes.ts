import { Router } from 'express';
import ControllerStation from '../controllers/ControllerStation';

const stationRouter = Router();
const controllerStation = new ControllerStation();

stationRouter.post('/', controllerStation.create);

export default stationRouter;
