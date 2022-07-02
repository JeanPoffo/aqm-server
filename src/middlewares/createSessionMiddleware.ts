import { celebrate, Joi, Segments } from 'celebrate';

const createSessionMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

export default createSessionMiddleware;
