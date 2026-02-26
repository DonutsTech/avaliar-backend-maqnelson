import Joi from 'joi';

const createUser = Joi.object().keys({
  ROLE: Joi.string().min(1).allow('USER', 'ADMIN').optional(),
  EMAIL: Joi.string().email().required(),
  PASSWORD: Joi.string().min(6).required(),
});

export default createUser;
