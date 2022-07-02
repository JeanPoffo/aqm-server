import { celebrate, Joi, Segments } from 'celebrate';

const indexDashboardMiddleware = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    startDate: Joi.string().isoDate().required(),
    endDate: Joi.string().isoDate().required(),
    stationId: Joi.string().uuid(),
  }),
});

export default indexDashboardMiddleware;
