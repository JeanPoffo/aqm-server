import { celebrate, Joi, Segments } from 'celebrate';

const createUserMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

export default createUserMiddleware;
