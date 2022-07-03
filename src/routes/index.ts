import { Router } from 'express';
import systemRouter from './system.routes';
import rawDataRouter from './dataRaw.routes';
import stationRouter from './station.routes';
import dashboardRouter from './dashboard.routes';
import sessionRouter from './session.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/', systemRouter);
routes.use('/data-raw', rawDataRouter);
routes.use('/dashboard', dashboardRouter);
routes.use('/session', sessionRouter);
routes.use('/user', userRouter);
routes.use('/station', stationRouter);

export default routes;
