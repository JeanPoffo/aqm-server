import { Router } from 'express';

import ControllerDataRaw from '../controllers/ControllerDataRaw';
import createDataRawMiddleware from '../middlewares/createDataRawMiddleware';

const rawDataRouter = Router();
const controllerDataRaw = new ControllerDataRaw();

rawDataRouter.post('/', createDataRawMiddleware, controllerDataRaw.create);

export default rawDataRouter;
