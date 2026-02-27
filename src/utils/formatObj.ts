import type { Prisma } from "../generated/prisma/client";

export const formatCheckinForObject = (checkin: Prisma.CheckinGetPayload<{ include: { SCHEMAS: { include: { MODELS: { include: { INPUTS: { include: { EMUNS: true } } } } } } } }>) => {
  const newObj: { [key: string]: string } = {};

  for (const schema of checkin.SCHEMAS) {
    for (const model of schema.MODELS) {
      for (const input of model.INPUTS) {
        newObj[input.NAME] = "";
      }
    }
  }

  return newObj;
}
