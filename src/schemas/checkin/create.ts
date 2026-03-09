import Joi from "joi";

const createCheckin = Joi.object({
  NAME: Joi.string().max(250).required(),
  SCHEMAS: Joi.array().items({
    TITLE: Joi.string().max(250).required(),
    MODELS: Joi.array().items(
      Joi.object({
        NAME: Joi.string().valid('simple', 'set', 'obs', 'wheel').required(),
        TITLE: Joi.string().allow("").max(250).optional(),
        QUESTION: Joi.string().allow("").max(250).optional(),
        INPUTS: Joi.array().items(
          Joi.object({
            TYPE: Joi.string().valid('text', 'number', 'phone', 'email', 'currency', 'cpfcnpj', 'cpf', 'picker', 'radio', 'file', 'select').required(),
            NAME: Joi.string().max(250).required(),
            LABEL: Joi.string().allow("").max(250),
            VALUE: Joi.string().allow("").max(250),
            PLACEHOLDER: Joi.string().allow("").max(250),
            REQUIRED: Joi.boolean().required(),
            MULTIPLE: Joi.boolean().required(),
            MIN: Joi.number().allow(undefined).optional(),
            MAX: Joi.number().allow(undefined).optional(),
            BONDTYPE: Joi.string().valid('ICONS', 'PHOTO', 'BONDPHOTO', 'LOCATION', 'VALUES', 'NOTES', 'FORM', 'SINGLE', 'DUPLO', '').optional(),
            EMUNS: Joi.array().items(
              Joi.object({
                TITLE: Joi.string().max(250).required(),
                NAME: Joi.string().max(250).required(),
              })
            ).optional(),
          }).optional()
        ).optional(),
      })
    ).optional(),
  }),
});

export default createCheckin;
