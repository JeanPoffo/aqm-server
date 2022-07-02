import { Router } from 'express';
import ControllerSession from '../controllers/ControllerSession';
import createSessionMiddleware from '../middlewares/createSessionMiddleware';

const sessionRouter = Router();
const controllerSession = new ControllerSession();

sessionRouter.post('/', createSessionMiddleware, controllerSession.create);

export default sessionRouter;
