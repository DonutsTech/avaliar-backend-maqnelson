import type { ObjectSchema } from "joi";
import createForm from "./form/create";
import createGaleryRate from "./galery/create";
import createMarkWheels from "./markWheels/create";
import createRate from "./rate/create";
import updateRate from "./rate/update";
import createUser from "./user/create";

const schemas: { [key: string]: ObjectSchema } = {
  "user/create": createUser,
  "form/create": createForm,
  "markWheels/create": createMarkWheels,
  "rate/create": createRate,
  "rate/update": updateRate,
  "galery/create": createGaleryRate,
};

export default schemas;
