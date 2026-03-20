import type { CreateRateDto } from "../../@types/interface/createRate.dto";
import { rateModel } from "../../models/rate";
import { versionCheckinService } from "../versionCheckin";

class RateService {
  async createRateCheckin(body: CreateRateDto, email: string) {
    try {
      await versionCheckinService.existID(body.IDVERSIONCHECKIN);

      const existUuid = await rateModel.findBy({ UUID: body.UUID });

      if (existUuid) {
        return existUuid;
      }

      const rate = await rateModel.create({
        UUID: body.UUID,
        RESULT: body.RESULT,
        STATUS: body.STATUS,
        CODVEND: body.CODVEND,
        CODCLI: body.CODCLI,
        LJCLI: body.LJCLI,
        CODPROS: body.CODPROS,
        LJPROS: body.LJPROS,
        EMAILVEND: email,
        VERSIONCHECKIN: { connect: { ID: body.IDVERSIONCHECKIN } }
      });

      return rate;
    } catch (error) {
      throw error;
    }
  }

  async filterRateCheckinEmailVend(email: string) {
    try {
      const rate = await rateModel.findAll({
        where: {
          EMAILVEND: email,
        },
        orderBy: {
          CREATEDAT: 'desc',
        },
        take: 30,
      });

      return { rate };
    } catch (error) {
      throw error;
    }
  }
}
export const rateService = new RateService();
