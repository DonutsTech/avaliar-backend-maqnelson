import type { ObjectSchema } from "joi";
import createCheckin from "./checkin/create";
import createMarkWheels from "./markWheels/create";
import createRateCheckinVersion from "./rateCheckin/create";
import createUser from "./user/create";

const schemas: { [key: string]: ObjectSchema } = {
  "user/create": createUser,
  "checkin/create": createCheckin,
  "markWheels/create": createMarkWheels,
  "rateCheckin/create": createRateCheckinVersion,
};

export default schemas;
