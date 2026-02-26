import type { ObjectSchema } from "joi";
import createCheckin from "./checkin/create";
import createUser from "./user/create";

const schemas: { [key: string]: ObjectSchema } = {
  "user/create": createUser,
  "checkin/create": createCheckin,
};

export default schemas;
