import { StatusCodes } from "http-status-codes";
import type { CreateCheckinDto } from "../../@types/interface/createCheckin.dto";
import { CustomError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { checkinModel } from "../../models/checkin";
import { formatCheckinForObject } from "../../utils/formatObj";
import { emunService } from "../emun";
import { inputService } from "../input";
import { modelService } from "../model";
import { schemaService } from "../schema";
import { versionCheckinService } from "../versionCheckin";

class CheckinService {
  async checkin(ID: string) {
    try {
      await this.existID(ID);

      const checkin = await checkinModel.findBy({ ID }, { SCHEMAS: { include: { MODELS: { include: { INPUTS: { include: { EMUNS: true } } } } } } }) as Prisma.CheckinGetPayload<{ include: { SCHEMAS: { include: { MODELS: { include: { INPUTS: { include: { EMUNS: true } } } } } } } }>;

      return checkin;
    } catch (error) {
      throw error;
    }
  }

  async newsSchemaModalInputEmun(id: string, body: CreateCheckinDto) {
    try {
      if (Array.isArray(body.SCHEMAS) && body.SCHEMAS.length > 0) {
        for (const schema of body.SCHEMAS) {
          const createSchema = await schemaService.createSchema({
            CHECKINID: id,
            TITLE: schema.TITLE
          })

          if (Array.isArray(schema.MODELS) && schema.MODELS.length > 0) {
            for (const model of schema.MODELS) {
              const createModal = await modelService.createModal({
                NAME: model.NAME,
                TITLE: model.TITLE,
                QUESTION: model.QUESTION,
                SCHEMAID: createSchema.ID
              });

              if (Array.isArray(model.INPUTS) && model.INPUTS.length > 0) {
                for (const input of model.INPUTS) {
                  const createInput = await inputService.createInput({
                    TYPE: input.TYPE,
                    NAME: input.NAME,
                    LABEL: input.LABEL,
                    PLACEHOLDER: input.PLACEHOLDER,
                    REQUIRED: input.REQUIRED,
                    MULTIPLE: input.MULTIPLE,
                    VALUE: input.VALUE,
                    MIN: input.MIN,
                    MAX: input.MAX,
                    BONDTYPE: input.BONDTYPE,
                    MODELID: createModal.ID
                  });

                  if (Array.isArray(input.EMUNS) && input.EMUNS.length > 0) {
                    for (const emun of input.EMUNS) {
                      await emunService.createEmun({
                        NAME: emun.NAME,
                        INPUTID: createInput.ID,
                        TITLE: emun.TITLE,
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

  async createCheckin(body: CreateCheckinDto) {
    try {
      const createCheckin = await checkinModel.create({
        NAME: body.NAME,
      })

      await this.newsSchemaModalInputEmun(createCheckin.ID, body);

      const checkin = await this.checkin(createCheckin.ID);

      const formatObj = formatCheckinForObject(checkin);

      const versionCheckin = await versionCheckinService.create({
        ATIVE: true,
        JSON_CHECKIN: JSON.stringify(checkin),
        OBJECT_CHECKIN: JSON.stringify(formatObj),
        VERSION: 1,
        IDCHECKIN: createCheckin.ID,
        NAME: createCheckin.NAME,
        PHOTO: '',
        VIDEO: true,
      })

      return { checkin, versionCheckin };
    } catch (error) {
      throw error;
    }
  }

  async existID(id: string) {
    if (!(await checkinModel.count({ ID: id }))) {
      throw new CustomError('Check-in não encontrado, por favor verifique o seu id', StatusCodes.NOT_FOUND);
    }
  }

  async updateCheckin(id: string, body: CreateCheckinDto) {
    try {
      let checkin = await this.checkin(id);

      await checkinModel.update(id, {
        NAME: body.NAME,
      })

      if (Array.isArray(checkin.SCHEMAS) && checkin.SCHEMAS.length > 0) {
        for (const schema of checkin.SCHEMAS) {

          if (Array.isArray(schema.MODELS) && schema.MODELS.length > 0) {
            for (const model of schema.MODELS) {

              if (Array.isArray(model.INPUTS) && model.INPUTS.length > 0) {
                for (const input of model.INPUTS) {
                  if (Array.isArray(input.EMUNS) && input.EMUNS.length > 0) {
                    for (const emun of input.EMUNS) {
                      await emunService.deleteEmun(emun.ID);
                    }
                  }

                  await inputService.deleteInput(input.ID);
                }
              }

              await modelService.deleteModal(model.ID);
            }
          }

          await schemaService.deleteSchema(schema.ID);
        }
      }

      await this.newsSchemaModalInputEmun(id, body);

      checkin = await this.checkin(id);

      const formatObj = formatCheckinForObject(checkin);

      const versionCheckin = await versionCheckinService.findVersionCheckinByIdCheckin(id);

      if (versionCheckin === null) {
        throw new CustomError('VersionCheckin não encontrado, por favor verifique o seu id', StatusCodes.NOT_FOUND);
      }

      await versionCheckinService.updateVersionCheckin(versionCheckin.ID, {
        ATIVE: false,
        JSON_CHECKIN: versionCheckin.JSON_CHECKIN,
        OBJECT_CHECKIN: versionCheckin.OBJECT_CHECKIN,
        VERSION: versionCheckin.VERSION,
        IDCHECKIN: versionCheckin.IDCHECKIN,
        NAME: versionCheckin.NAME,
        PHOTO: versionCheckin.PHOTO,
        VIDEO: versionCheckin.VIDEO,
      });

      const newVersionCheckin = await versionCheckinService.create({
        ATIVE: true,
        JSON_CHECKIN: JSON.stringify(checkin),
        OBJECT_CHECKIN: JSON.stringify(formatObj),
        VERSION: (versionCheckin.VERSION + 1),
        IDCHECKIN: id,
        NAME: body.NAME,
        PHOTO: '',
        VIDEO: true,
      });

      return { checkin, versionCheckin: newVersionCheckin };
    } catch (error) {
      throw error;
    }
  }

  async existCheckinForName(name: string) {
    try {
      return await checkinModel.findBy({ NAME: name.toUpperCase() });
    } catch (error) {
      throw error;
    }
  }
}

export const checkinService = new CheckinService();
