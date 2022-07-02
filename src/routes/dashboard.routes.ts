import { Router } from 'express';
import ControllerDashboard from '../controllers/ControllerDashboard';
import indexDashboardMiddleware from '../middlewares/indexDashboardMiddleware';

const rawDataRouter = Router();
const controllerDashboard = new ControllerDashboard();

rawDataRouter.get('/', indexDashboardMiddleware, controllerDashboard.index);

export default rawDataRouter;
