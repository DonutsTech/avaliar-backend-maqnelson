import Joi from "joi";

const createMarkWheels = Joi.object({
  NAME: Joi.string().max(250).required(),
  UUID: Joi.string().required(),
});

export default createMarkWheels;
