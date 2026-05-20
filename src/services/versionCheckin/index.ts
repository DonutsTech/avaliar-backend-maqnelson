import type { CreateVersionCheckinDto } from "../../@types/interface/createVersionCheckin.dto";
import type { Prisma } from "../../generated/prisma/client";
import { versionCheckinModel } from "../../models/versionCheckin";
import { checkinService } from "../checkin";

type VersionCheckinSelectInclude = {
  ID: true,
  NAME: true,
  VERSION: true,
  IDCHECKIN: true,
  PHOTO: true,
  VIDEO: true,
  ATIVE: true,
  JSON_CHECKIN: true,
  OBJECT_CHECKIN: true,
  CREATEDAT: true,
  UPDATEDAT: true,
}

const VERSION_CHECKIN_SELECT: Prisma.VersionCheckinSelect = {
  ID: true,
  NAME: true,
  VERSION: true,
  IDCHECKIN: true,
  PHOTO: true,
  VIDEO: true,
  ATIVE: true,
  JSON_CHECKIN: true,
  OBJECT_CHECKIN: true,
  CREATEDAT: true,
  UPDATEDAT: true,
}

class VersionCheckinService {
  async create(body: CreateVersionCheckinDto) {
    try {
      await checkinService.existID(body.IDCHECKIN);

      const createVersionCheckin = await versionCheckinModel.create({
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

      return createVersionCheckin;
    } catch (error) {
      throw error;
    }
  }

  async filterVersionCheckinStatusTrue() {
    try {
      const versionCheckin = await versionCheckinModel.findAll({
        where: {
          ATIVE: true,
        },
      });

      return { checkin: versionCheckin };
    } catch (error) {
      throw error;
    }
  }

  async findVersionCheckinByIdCheckin(idCheckin: string) {
    try {
      const versionCheckin = await versionCheckinModel.findBy<VersionCheckinSelectInclude>({
        where: {
          IDCHECKIN: idCheckin,
          ATIVE: true,
        }
      });

      return versionCheckin;
    } catch (error) {
      throw error;
    }
  }

  async existID(id: string) {
    if (!(await versionCheckinModel.count({ ID: id }))) {
      throw new Error('VersionCheckin não encontrado, por favor verifique o seu id');
    }
  }

  async updateVersionCheckin(id: string, body: CreateVersionCheckinDto) {
    try {
      await this.existID(id);
      const versionCheckin = await versionCheckinModel.update<VersionCheckinSelectInclude>(id, {
        ATIVE: body.ATIVE,
        JSON_CHECKIN: body.JSON_CHECKIN,
        OBJECT_CHECKIN: body.OBJECT_CHECKIN,
        VERSION: body.VERSION,
        IDCHECKIN: body.IDCHECKIN,
        NAME: body.NAME,
      }, VERSION_CHECKIN_SELECT);

      return versionCheckin;
    } catch (error) {
      throw error;
    }
  }
}

export const versionCheckinService = new VersionCheckinService();
