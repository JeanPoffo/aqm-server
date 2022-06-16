import { Router } from 'express';
import systemRouter from './system.routes';
import rawDataRouter from './dataRaw.routes';
import stationRouter from './station.routes';
import dashboardRouter from './dashboard.routes';

const routes = Router();

routes.use('/', systemRouter);
routes.use('/data-raw', rawDataRouter);
routes.use('/station', stationRouter);
routes.use('/dashboard', dashboardRouter);

export default routes;
