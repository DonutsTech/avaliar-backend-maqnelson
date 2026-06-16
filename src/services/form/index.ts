import { StatusCodes } from "http-status-codes";
import type { CreateForm, FormSelectInclude } from "../../@types/interface/form";
import { CustomError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { formModel } from "../../models/form";
import { formatForminForObject } from "../../utils/formatObj";
import { emunService } from "../emun";
import { inputService } from "../input";
import { modelService } from "../model";
import { schemaService } from "../schema";

export const FORM_SELECT_INCLUDE: Prisma.CheckinSelect = {
  SCHEMAS: {
    select: {
      ID: true,
      TITLE: true,
      IDCHECKIN: true,
      MODELS: {
        select: {
          ID: true,
          NAME: true,
          TITLE: true,
          QUESTION: true,
          IDSCHEMA: true,
          INPUTS: {
            select: {
              ID: true,
              TYPE: true,
              NAME: true,
              LABEL: true,
              VALUE: true,
              PLACEHOLDER: true,
              REQUIRED: true,
              MULTIPLE: true,
              MIN: true,
              MAX: true,
              BONDTYPE: true,
              IDMODEL: true,
              EMUNS: {
                select: {
                  ID: true,
                  NAME: true,
                  TITLE: true,
                  IDINPUT: true,
                }
              }
            }
          }
        }
      }
    }
  }
}

class FormService {
  async form(ID: string) {
    try {
      const find = await formModel.findBy<FormSelectInclude>({where: { ID }, select: FORM_SELECT_INCLUDE });

      if (!find) {
        throw new CustomError('Check-in não encontrado, por favor verifique o seu id', StatusCodes.NOT_FOUND);
      }

      return find;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await formModel.findMany<FormSelectInclude>({ select: FORM_SELECT_INCLUDE });
    } catch (error) {
      throw error;
    }
  }

  async newsSchemaModalInputEmun(id: string, body: CreateForm) {
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
                    MODELID: createModal.ID,
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

  async createForm(body: CreateForm) {
    try {
      const create = await formModel.create({
        NAME: body.NAME,
      })

      await this.newsSchemaModalInputEmun(create.ID, body);

      const form = await this.form(create.ID);

      const formatObj = formatForminForObject(form);

      const versionForm = await versionFormService.create({
        ATIVE: true,
        JSON_CHECKIN: JSON.stringify(form),
        OBJECT_CHECKIN: JSON.stringify(formatObj),
        VERSION: 1,
        IDCHECKIN: create.ID,
        NAME: create.NAME,
        PHOTO: true,
        VIDEO: true,
      })

      return { form, versionForm };
    } catch (error) {
      throw error;
    }
  }

  async existID(id: string) {
    if (!(await formModel.count({ ID: id }))) {
      throw new CustomError('Check-in não encontrado, por favor verifique o seu id', StatusCodes.NOT_FOUND);
    }
  }

  async update(id: string, body: CreateForm) {
    try {
      let form = await this.form(id);

      await formModel.update(id, {
        NAME: body.NAME,
      })

      if (Array.isArray(form.SCHEMAS) && form.SCHEMAS.length > 0) {
        for (const schema of form.SCHEMAS) {

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

      form = await this.form(id);

      const formatObj = formatForminForObject(form);

      const versionForm = await versionFormService.findVersionCheckinByIdCheckin(id);

      if (versionForm === null) {
        throw new CustomError('VersionCheckin não encontrado, por favor verifique o seu id', StatusCodes.NOT_FOUND);
      }

      await versionFormService.updateVersionForm(versionForm.ID, {
        ATIVE: false,
        JSON_CHECKIN: versionForm.JSON_CHECKIN,
        OBJECT_CHECKIN: versionForm.OBJECT_CHECKIN,
        VERSION: versionForm.VERSION,
        IDCHECKIN: versionForm.IDCHECKIN,
        NAME: versionForm.NAME,
        PHOTO: versionForm.PHOTO,
        VIDEO: versionForm.VIDEO,
      });

      const newVersionForm = await versionFormService.create({
        ATIVE: true,
        JSON_CHECKIN: JSON.stringify(form),
        OBJECT_CHECKIN: JSON.stringify(formatObj),
        VERSION: (versionForm.VERSION + 1),
        IDCHECKIN: id,
        NAME: body.NAME,
        PHOTO: true,
        VIDEO: true,
      });

      return { form, versionForm: newVersionForm };
    } catch (error) {
      throw error;
    }
  }

  async existFormForName(name: string) {
    try {
      return await formModel.findBy({ where: { NAME: name } });
    } catch (error) {
      throw error;
    }
  }

  async deleteForm(id: string) {
    try {
      await this.existID(id);

      let checkin = await this.form(id);

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

      const versionForm = await versionFormService.findVersionFormByIdForm(id);

      if (versionForm === null) {
        throw new CustomError('VersionCheckin não encontrado, por favor verifique o seu id', StatusCodes.NOT_FOUND);
      }

      await versionFormService.updateVersionCheckin(versionForm.ID, {
        ATIVE: false,
        JSON_CHECKIN: versionForm.JSON_CHECKIN,
        OBJECT_CHECKIN: versionForm.OBJECT_CHECKIN,
        VERSION: versionForm.VERSION,
        IDCHECKIN: versionForm.IDCHECKIN,
        NAME: versionForm.NAME,
        PHOTO: versionForm.PHOTO,
        VIDEO: versionForm.VIDEO,
      });

      await formModel.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export const formService = new FormService();
