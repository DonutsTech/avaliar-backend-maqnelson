import type { ObjectSchema } from "joi";
import createUser from "./user/create";

const schemas: { [key: string]: ObjectSchema } = {
  "user/create": createUser,
};

export default schemas;
