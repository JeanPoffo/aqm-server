import { Router } from 'express';
import ControllerDataRaw from '../controllers/ControllerDataRaw';

const rawDataRouter = Router();
const controllerDataRaw = new ControllerDataRaw();

rawDataRouter.post('/', controllerDataRaw.create);

export default rawDataRouter;
