import Joi from 'joi';

const createRate = Joi.object({
  rate: Joi.array()
    .items(
      Joi.object({
        ID: Joi.number().required(),
        UUIDAPP: Joi.string().allow('').required(),
        IDVERSIONCHECKIN: Joi.string().required(),
        CODVEND: Joi.string().max(250).required(),
        FILIAL: Joi.string().max(250).allow('').optional(),
        NAMEVEND: Joi.string().max(250).required(),
        EMAILVEND: Joi.string().email().max(250).required(),
        RESULT: Joi.string().required(),
        TYPE: Joi.string().max(250).required(),
        YEAR: Joi.string().max(250).required(),
        MARK: Joi.string().max(250).required(),
        MARK_WEB: Joi.string().max(250).required(),
        MODEL: Joi.string().max(250).required(),
        MODEL_WEB: Joi.string().max(250).required(),
        CHASSI: Joi.string().max(250).required(),
        VALUE: Joi.string().max(250).required(),
        DATE: Joi.string().max(250).required(),
        CODCLI: Joi.string().max(250).allow('').optional(),
        LJCLI: Joi.string().max(250).allow('').optional(),
        CODPROS: Joi.string().max(250).allow('').optional(),
        LJPROS: Joi.string().max(250).allow('').optional(),
        NAMECLI: Joi.string().max(250).required(),
        ADDRESSCLI: Joi.string().max(250).required(),
        PHONECLI: Joi.string().max(250).allow('').optional(),
        EMAILCLI: Joi.string().email().max(250).required(),
        MESSAGE: Joi.string().allow('').optional(),
        STATUS: Joi.string().max(250).required(),
        PHOTO: Joi.string().max(250).required(),
      }),
    )
    .required(),
});

export default createRate;
