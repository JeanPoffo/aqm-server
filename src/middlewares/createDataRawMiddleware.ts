import { celebrate, Joi, Segments } from 'celebrate';

const createDataRawMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    stationId: Joi.string().uuid().required(),
    dateRegister: Joi.string().isoDate().required(),
    particulateMaterialTwoFive: Joi.number().required(),
    particulateMaterialTen: Joi.number().default(0),
    carbonMonoxide: Joi.number().required(),
    sulfurDioxide: Joi.number().default(0),
    nitrogenDioxide: Joi.number().default(0),
    ozone: Joi.number().required(),
    temperature: Joi.number().required(),
    humidity: Joi.number().required(),
  }),
});

export default createDataRawMiddleware;
