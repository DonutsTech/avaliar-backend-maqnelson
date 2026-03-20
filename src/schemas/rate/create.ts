import Joi from "joi";

const createRateVersion = Joi.object({
  UUID: Joi.string().allow("").required(),
  IDVERSIONCHECKIN: Joi.string().max(250).required(),
  RESULT: Joi.string().max(250).required(),
  STATUS: Joi.string().max(250).required(),
  CODVEND: Joi.string().max(250).required(),
  CODCLI: Joi.string().max(250).required(),
  LJCLI: Joi.string().max(250).required(),
  CODPROS: Joi.string().max(250).required(),
  LJPROS: Joi.string().max(250).required(),
});

export default createRateVersion;
