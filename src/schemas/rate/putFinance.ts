import Joi from 'joi';

const putFinance = Joi.object({
  CANAL: Joi.string().max(250).optional(),
  FILIAL_WEB: Joi.string().max(250).optional(),
  VALUE1YEAR: Joi.string().max(250).optional(),
  VALUE2YEAR: Joi.string().max(250).optional(),
  VALUE3YEAR: Joi.string().max(250).optional(),
  VALUE4YEAR: Joi.string().max(250).optional(),
  TAXA: Joi.string().max(250).optional(),
  STOKE: Joi.boolean().optional(),
  OBSREASON: Joi.string().max(250).optional(),
  VALUEBY: Joi.string().max(250).optional(),
  VALUENEG: Joi.string().max(250).optional(),
  RESSED: Joi.boolean().optional(),
  WHO: Joi.string().max(250).optional(),
  INDICATOR: Joi.boolean().optional(),
  VALUERATE: Joi.string().max(250).optional(),
  VALUESUG: Joi.string().max(250).optional(),
  VALIDITY: Joi.string().max(250).optional(),
  VALUEVIEW: Joi.string().max(250).optional(),
  MODALITY: Joi.string().max(250).optional(),
});

export default putFinance;
