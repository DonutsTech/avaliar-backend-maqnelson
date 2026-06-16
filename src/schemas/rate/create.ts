import Joi from "joi";

const createRate = Joi.object({
  rate: Joi.array().items(
    Joi.object({
      UUIDAPP: Joi.string().allow("").required(),
      IDVERSIONCHECKIN: Joi.string().required(),
      CODVEND: Joi.string().max(250).required(),
      FILIAL: Joi.string().max(250).required(),
      NAMEVEND: Joi.string().max(250).required(),
      EMAILVEND: Joi.string().email().max(250).required(),
      RESULT: Joi.string().required(),
      TYPE: Joi.string().max(250).required(),
      MARK: Joi.string().max(250).required(),
      MODEL: Joi.string().max(250).required(),
      CHASSI: Joi.string().max(250).required(),
      VALUE: Joi.string().max(250).required(),
      DATE: Joi.string().max(250).required(),
      CODCLI: Joi.string().max(250).required(),
      LJCLI: Joi.string().max(250).required(),
      CODPROS: Joi.string().max(250).required(),
      LJPROS: Joi.string().max(250).required(),
      NAMECLI: Joi.string().max(250).required(),
      ADDRESSCLI: Joi.string().max(250).required(),
      PHONECLI: Joi.string().max(250).required(),
      EMAILCLI: Joi.string().email().max(250).required(),
      MESSAGE: Joi.string().required(),
      STATUS: Joi.string().max(250).required(),
    })
  ).required(),
});

export default createRate;
