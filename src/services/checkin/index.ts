import { StatusCodes } from "http-status-codes";
import type { CreateCheckinDto } from "../../@types/interface/createCheckin.dto";
import { CustomError } from "../../error";
import { checkinModel } from "../../models/checkin";
import { modelService } from "../model";
import { schemaService } from "../schema";
import { inputService } from "../input";
import { emunService } from "../emun";

class CheckinService {
  async createCheckin(body: CreateCheckinDto) {
    try {
      const createCheckin = await checkinModel.create({
        NAME: body.NAME,
      })

      if (body.SCHEMAS.length > 0) {
        for (const schema of body.SCHEMAS) {
          const createSchema = await schemaService.createSchema({
            CHECKINID: createCheckin.ID,
            TITLE: schema.TITLE
          })

          if (schema.MODELS.length > 0) {
            for (const model of schema.MODELS) {
              const createModal = await modelService.createModal({
                NAME: model.NAME,
                TITLE: model.TITLE,
                QUESTION: model.QUESTION,
                PHOTO: model.PHOTO,
                BONDPHOTO: model.BONDPHOTO,
                LOCATION: model.LOCATION,
                SCHEMAID: createSchema.ID
              });

              if (model.INPUTS.length > 0) {
                for (const input of model.INPUTS) {
                  const createInput = await inputService.createInput({
                    TYPE: input.TYPE,
                    NAME: input.NAME,
                    LABEL: input.LABEL,
                    PLACEHOLDER: input.PLACEHOLDER,
                    REQUIRED: input.REQUIRED,
                    MULTIPLE: input.MULTIPLE,
                    BOND: input.BOND,
                    MIN: input.MIN,
                    MAX: input.MAX,
                    BONDTYPE: input.BONDTYPE,
                    MODELID: createModal.ID
                  });

                  if (input.EMUNS.length > 0) {
                    for (const emun of input.EMUNS) {
                      const createEmun = await emunService.createEmun({
                        NAME: emun.NAME,
                        INPUTID: createInput.ID
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async existID(id: string) {
    if (!(await checkinModel.count({ ID: id }))) {
      throw new CustomError('Check-in não encontrado, por favor verifique o seu id', StatusCodes.NOT_FOUND);
    }
  }
}

export const checkinService = new CheckinService();
