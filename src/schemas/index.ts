import type { ObjectSchema } from "joi";
import createCheckin from "./checkin/create";
import createUser from "./user/create";
import createMarkWheels from "./markWheels";

const schemas: { [key: string]: ObjectSchema } = {
  "user/create": createUser,
  "checkin/create": createCheckin,
  "markWheels/create": createMarkWheels,
};

export default schemas;
