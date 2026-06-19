import type { CreateVersionForm, VersionForminSelectInclude } from "../../@types/interface/versionForm";
import type { Prisma } from "../../generated/prisma/client";
import { versionFormModel } from "../../models/versionForm";
import { formService } from "../form";

const VERSION_FORM_SELECT: Prisma.VersionCheckinSelect = {
  ID: true,
  NAME: true,
  VERSION: true,
  IDCHECKIN: true,
  PHOTO: true,
  VIDEO: true,
  ATIVE: true,
  JSON_CHECKIN: true,
  OBJECT_CHECKIN: true,
  CREATEDAT: false,
  UPDATEDAT: false,
}

class VersionForminService {
  async create(body: CreateVersionForm) {
    try {
      await formService.existID(body.IDCHECKIN);

      const create = await versionFormModel.create({
        data: {
          ATIVE: body.ATIVE,
          JSON_CHECKIN: body.JSON_CHECKIN,
          OBJECT_CHECKIN: body.OBJECT_CHECKIN,
          VERSION: body.VERSION,
          IDCHECKIN: body.IDCHECKIN,
          NAME: body.NAME,
          PHOTO: body.PHOTO,
          VIDEO: body.VIDEO,
        }
      })

      return create;
    } catch (error) {
      throw error;
    }
  }

  async filterVersionForminStatusTrue() {
    try {
      const versionForm = await versionFormModel.findAll({
        where: {
          ATIVE: true,
        },
        select: VERSION_FORM_SELECT
      });

      return { form: versionForm };
    } catch (error) {
      throw error;
    }
  }

  async findVersionForminByIdCheckin(idCheckin: string) {
    try {
      const versionForm = await versionFormModel.findBy<VersionForminSelectInclude>({
        where: {
          IDCHECKIN: idCheckin,
          ATIVE: true,
        },
        select: VERSION_FORM_SELECT
      });

      return versionForm;
    } catch (error) {
      throw error;
    }
  }

  async existID(id: string) {
    if (!(await versionFormModel.count({ ID: id }))) {
      throw new Error('Version Form não encontrado, por favor verifique o seu id');
    }
  }

  async updateVersionCheckin(id: string, body: CreateVersionForm) {
    try {
      await this.existID(id);
      const versionForm = await versionFormModel.update<VersionForminSelectInclude>(id, {
        ATIVE: body.ATIVE,
        JSON_CHECKIN: body.JSON_CHECKIN,
        OBJECT_CHECKIN: body.OBJECT_CHECKIN,
        VERSION: body.VERSION,
        IDCHECKIN: body.IDCHECKIN,
        NAME: body.NAME,
      }, VERSION_FORM_SELECT);

      return versionForm;
    } catch (error) {
      throw error;
    }
  }
}

export const versionForminService = new VersionForminService();
