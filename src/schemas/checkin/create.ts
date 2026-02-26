import Joi from "joi";

const createCheckin = Joi.object({
  NAME: Joi.string().max(200).required(),
  SCHEMAS: Joi.array().items({
    TITLE: Joi.string().max(250).required(),
    MODELS: Joi.array().items({
      NAME: Joi.string().max(250).required(),
      TITLE: Joi.string().allow("").max(250).optional(),
      QUESTION: Joi.string().allow("").max(250).optional(),
      ICONS: Joi.boolean().required(),
      PHOTO: Joi.boolean().required(),
      BONDPHOTO: Joi.boolean().required(),
      LOCATION: Joi.boolean().required(),
      INPUTS: Joi.array().items({
        TYPE: Joi.string().valid("text", "select", "radio", "checkout", "file").required(),
        NAME: Joi.string().max(250).required(),
        LABEL: Joi.string().allow("").max(250),
        PLACEHOLDER: Joi.string().allow("").max(250),
        REQUIRED: Joi.boolean().required(),
        MULTIPLE: Joi.boolean().required(),
        BOND: Joi.boolean().required(),
        MIN: Joi.number().optional(),
        MAX: Joi.number().optional(),
        BONDTYPE: Joi.string().allow(""),
        EMUNS: Joi.array().items({
          NAME: Joi.string().max(250).required(),
        }),
      }),
    }),
  }),
});

export default createCheckin;
