import type { Prisma } from "../generated/prisma/client";
import type { CheckinSelectInclude } from "../services/checkin";

export const formatCheckinForObject = (checkin: Prisma.CheckinGetPayload<{ select: CheckinSelectInclude }>) => {
  const newObj: { [key: string]: string } = {};

  for (const schema of checkin.SCHEMAS) {
    for (const model of schema.MODELS) {
      for (const input of model.INPUTS) {
        newObj[input.NAME] = input.VALUE;
      }
    }
  }

  newObj['photo_frente'] = "";
  newObj['photo_esquerda'] = "";
  newObj['photo_direita'] = "";
  newObj['photo_pneus_dianteiros'] = "";
  newObj['photo_cabine'] = "";
  newObj['photo_horimetro'] = "";
  newObj['photo_chassi'] = "";
  newObj['photo_traseira'] = "";
  newObj['photo_pneus_traseiros'] = "";
  newObj['video_all'] = "";

  return newObj;
}
