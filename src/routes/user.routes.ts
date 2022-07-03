import { Router } from 'express';
import ControllerUser from '../controllers/ControllerUser';
import createUserMiddleware from '../middlewares/createUserMiddleware';
import validateSessionMiddleware from '../middlewares/validateSessionMiddleware';

const userRouter = Router();
const controllerUser = new ControllerUser();

if (String(process.env.ACTIVATE_ROUTE_RESTRICTION) === 'true') {
  userRouter.use(validateSessionMiddleware);
}

userRouter.post('/', createUserMiddleware, controllerUser.create);
userRouter.delete('/:id', controllerUser.delete);

export default userRouter;
