import { celebrate, Joi, Segments } from 'celebrate';

const createStationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }),
});

export default createStationMiddleware;
