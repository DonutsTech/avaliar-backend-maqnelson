import type { CreateVersionCheckinDto } from "../../@types/interface/createVersionCheckin.dto";
import { versionCheckinModel } from "../../models/versionCheckin";
import { checkinService } from "../checkin";

class VersionCheckinService {
  async create(body: CreateVersionCheckinDto) {
    try {
      await checkinService.existID(body.IDCHECKIN);

      const createVersionCheckin = await versionCheckinModel.create({
        ATIVE: body.ATIVE,
        JSON_CHECKIN: body.JSON_CHECKIN,
        OBJECT_CHECKIN: body.OBJECT_CHECKIN,
        VERSION: body.VERSION,
        IDCHECKIN: body.IDCHECKIN,
        NAME: body.NAME,
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
      const versionCheckin = await versionCheckinModel.findBy(
        {
          IDCHECKIN: idCheckin,
          ATIVE: true,
        },
      );

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
      const versionCheckin = await versionCheckinModel.update(id, {
        ATIVE: body.ATIVE,
        JSON_CHECKIN: body.JSON_CHECKIN,
        OBJECT_CHECKIN: body.OBJECT_CHECKIN,
        VERSION: body.VERSION,
        IDCHECKIN: body.IDCHECKIN,
        NAME: body.NAME,
      })

      return versionCheckin;
    } catch (error) {
      throw error;
    }
  }
}

export const versionCheckinService = new VersionCheckinService();
