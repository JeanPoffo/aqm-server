import { Router } from 'express';
import ControllerdataRaw from '../controllers/ControllerDataRaw';

const rawDataRouter = Router();
const controllerDataRaw = new ControllerdataRaw();

rawDataRouter.post('/', controllerDataRaw.create);

export default rawDataRouter;
