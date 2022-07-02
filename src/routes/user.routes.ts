import { Router } from 'express';
import ControllerUser from '../controllers/ControllerUser';
import createUserMiddleware from '../middlewares/createUserMiddleware';

const userRouter = Router();
const controllerUser = new ControllerUser();

userRouter.post('/', createUserMiddleware, controllerUser.create);
userRouter.delete('/:id', controllerUser.delete);

export default userRouter;
