import Joi from "joi";

const createGaleryRate = Joi.object({
  UUIDAPP: Joi.string().required(),
  NAME: Joi.string().max(250).required(),
  RATE_UUIDAPP: Joi.string().required(),
});

export default createGaleryRate;
