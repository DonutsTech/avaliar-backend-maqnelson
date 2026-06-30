import Joi from 'joi';

const putFinance = Joi.object({
  CANAL: Joi.string().allow('').max(250).optional(),
  FILIAL_WEB: Joi.string().allow('').max(250).optional(),
  VALUE1YEAR: Joi.string().allow('').max(250).optional(),
  VALUE2YEAR: Joi.string().allow('').max(250).optional(),
  VALUE3YEAR: Joi.string().allow('').max(250).optional(),
  VALUE4YEAR: Joi.string().allow('').max(250).optional(),
  TAXA: Joi.string().allow('').max(250).optional(),
  STOKE: Joi.boolean().allow('').optional(),
  OBSREASON: Joi.string().allow('').max(250).optional(),
  VALUEBY: Joi.string().allow('').max(250).optional(),
  VALUENEG: Joi.string().allow('').max(250).optional(),
  RESSED: Joi.boolean().allow('').optional(),
  WHO: Joi.string().allow('').max(250).optional(),
  INDICATOR: Joi.boolean().allow('').optional(),
  VALUERATE: Joi.string().allow('').max(250).optional(),
  VALUESUG: Joi.string().allow('').max(250).optional(),
  VALIDITY: Joi.string().allow('').max(250).optional(),
  VALUEVIEW: Joi.string().allow('').max(250).optional(),
  MODALITY: Joi.string().allow('').max(250).optional(),
});

export default putFinance;
