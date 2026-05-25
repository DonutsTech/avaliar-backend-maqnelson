import Joi from "joi";

const createCheckin = Joi.object({
  NAME: Joi.string().max(250).required(),
  SCHEMAS: Joi.array().items({
    TITLE: Joi.string().max(250).required(),
    MODELS: Joi.array().items(
      Joi.object({
        NAME: Joi.string().valid('simple', 'set', 'obs', 'wheel').required(),
        TITLE: Joi.string().allow("").max(250).required(),
        QUESTION: Joi.string().allow("").max(250).required(),
        INPUTS: Joi.array().items(
          Joi.object({
            TYPE: Joi.string().valid('text', 'number', 'phone', 'email', 'currency', 'cpfcnpj', 'cpf', 'picker', 'radio', 'file', 'select').required(),
            NAME: Joi.string().max(250).required(),
            LABEL: Joi.string().allow("").max(250).required(),
            VALUE: Joi.string().allow("").max(250).required(),
            PLACEHOLDER: Joi.string().allow("").max(250),
            REQUIRED: Joi.boolean().required(),
            MULTIPLE: Joi.boolean().required(),
            MIN: Joi.number().allow(null).optional(),
            MAX: Joi.number().allow(null).optional(),
            BONDTYPE: Joi.string().valid('ICONS', 'PHOTO', 'BONDPHOTO', 'LOCATION', 'VALUES', 'NOTES', 'FORM', 'SINGLE LEFT', 'SINGLE RIGHT', 'DUPLO RIGHT', 'DUPLO LEFT', '').optional(),
            EMUNS: Joi.array().items(
              Joi.object({
                TITLE: Joi.string().max(250).required(),
                NAME: Joi.string().max(250).required(),
              })
            ).optional(),
          })
        ).optional(),
      })
    ).optional(),
  }),
});

export default createCheckin;
