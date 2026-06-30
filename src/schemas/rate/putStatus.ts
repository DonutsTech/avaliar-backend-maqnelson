import Joi from 'joi';

const putStatus = Joi.object({
  STATUS: Joi.string().max(250).optional(),
  ACCEPTED: Joi.string().allow('').max(250).optional(),
  APPROVED: Joi.string().allow('').max(250).optional(),
  MESSAGE: Joi.string().allow('').max(250).optional(),
});

export default putStatus;
