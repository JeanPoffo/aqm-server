import { Router } from 'express';
import ControllerStation from '../controllers/ControllerStation';
import createStationMiddleware from '../middlewares/createStationMiddleware';

const stationRouter = Router();
const controllerStation = new ControllerStation();

stationRouter.post('/', createStationMiddleware, controllerStation.create);

export default stationRouter;
