import type { ObjectSchema } from "joi";
import createCheckin from "./checkin/create";
import createMarkWheels from "./markWheels/create";
import createRateVersion from "./rate/create";
import createUser from "./user/create";

const schemas: { [key: string]: ObjectSchema } = {
  "user/create": createUser,
  "checkin/create": createCheckin,
  "markWheels/create": createMarkWheels,
  "rate/create": createRateVersion,
};

export default schemas;
