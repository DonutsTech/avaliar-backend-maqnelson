import type { CreateVersionCheckinDto } from "../../@types/interface/createVersionCheckin.dto";
import { versionCheckinModel } from "../../models/versionCheckin";
import { checkinService } from "../checkin";

class VersionCheckinService {
  async versionCheckin(body: CreateVersionCheckinDto) {
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
}

export const versionCheckinService = new VersionCheckinService();
