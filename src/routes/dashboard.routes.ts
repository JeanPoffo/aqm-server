import { Router } from 'express';
import ControllerDashboard from '../controllers/ControllerDashboard';

const rawDataRouter = Router();
const controllerDashboard = new ControllerDashboard();

rawDataRouter.get('/', controllerDashboard.index);

export default rawDataRouter;
