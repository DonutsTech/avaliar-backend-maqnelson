import Joi from 'joi';

const putStatus = Joi.object({
  STATUS: Joi.string().max(250).optional(),
  ACCEPTED: Joi.string().max(250).optional(),
  APPROVED: Joi.string().max(250).optional(),
  MESSAGE: Joi.string().max(250).optional(),
});

export default putStatus;
