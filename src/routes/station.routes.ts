import { Router } from 'express';
import ControllerStation from '../controllers/ControllerStation';
import createStationMiddleware from '../middlewares/createStationMiddleware';
import validateSessionMiddleware from '../middlewares/validateSessionMiddleware';

const stationRouter = Router();
const controllerStation = new ControllerStation();

stationRouter.get('/', controllerStation.index);

if (String(process.env.ACTIVATE_ROUTE_RESTRICTION) === 'true') {
  stationRouter.use(validateSessionMiddleware);
}

stationRouter.post('/', createStationMiddleware, controllerStation.create);

export default stationRouter;
