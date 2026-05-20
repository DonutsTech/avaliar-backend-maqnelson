import type { CreateRateCheckinDto } from "../../@types/interface/createRate.dto";
import type { Prisma } from "../../generated/prisma/browser";
import { rateModel } from "../../models/rate";
import { versionCheckinService } from "../versionCheckin";

type RateCheckinSelect = {
   UUIDAPP: true,
  ID: true,
  ADDRESSCLI: true,
  CHASSI: true,
  CODCLI: true,
  CODPROS: true,
  CODVEND: true,
  DATE: true,
  EMAILCLI: true,
  EMAILVEND: true,
  FILIAL: true,
  IDVERSIONCHECKIN: true,
  LJCLI: true,
  LJPROS: true,
  MARK: true,
  MODEL: true,
  NAMECLI: true,
  NAMEVEND: true,
  PHONECLI: true,
  RESULT: true,
  TYPE: true,
  VALUE: true,
  STATUS: true,
}

const RATE_CHECKIN_SELECT: Prisma.RateSelect = {
  UUIDAPP: true,
  ID: true,
  ADDRESSCLI: true,
  CHASSI: true,
  CODCLI: true,
  CODPROS: true,
  CODVEND: true,
  DATE: true,
  EMAILCLI: true,
  EMAILVEND: true,
  FILIAL: true,
  IDVERSIONCHECKIN: true,
  LJCLI: true,
  LJPROS: true,
  MARK: true,
  MODEL: true,
  NAMECLI: true,
  NAMEVEND: true,
  PHONECLI: true,
  RESULT: true,
  TYPE: true,
  VALUE: true,
  STATUS: true,
}

class RateService {
  async createRateCheckin(body: CreateRateCheckinDto) {
    try {
      await versionCheckinService.existID(body.IDVERSIONCHECKIN);

      const existUuid = await rateModel.findBy({ where: { UUIDAPP: body.UUIDAPP } });

      if (existUuid) {
        return existUuid;
      }

      const rate = await rateModel.create({
        data: {
          UUIDAPP: body.UUIDAPP,
          CODVEND: body.CODVEND,
          FILIAL: body.FILIAL,
          NAMEVEND: body.NAMEVEND,
          EMAILVEND: body.EMAILVEND,
          RESULT: body.RESULT,
          TYPE: body.TYPE,
          MARK: body.MARK,
          MODEL: body.MODEL,
          CHASSI: body.CHASSI,
          VALUE: body.VALUE,
          DATE: body.DATE,
          CODCLI: body.CODCLI,
          LJCLI: body.LJCLI,
          CODPROS: body.CODPROS,
          LJPROS: body.LJPROS,
          NAMECLI: body.NAMECLI,
          ADDRESSCLI: body.ADDRESSCLI,
          PHONECLI: body.PHONECLI,
          EMAILCLI: body.EMAILCLI,
          VERSIONCHECKIN: {connect: { ID: body.IDVERSIONCHECKIN }},
        },
        select: RATE_CHECKIN_SELECT,
      });

      return rate;
    } catch (error) {
      throw error;
    }
  }

  async filterRateCheckinEmailVend(email: string) {
    try {
      const recusados = await rateModel.findAll<RateCheckinSelect>({
        where: {
          EMAILVEND: email,
          STATUS: "RECUSADO",
        },
        select: RATE_CHECKIN_SELECT,
      });

    const faltantes = 10 - recusados.length;

    if (faltantes <= 0) {
      return { rate: recusados };
    }

    const outros = await rateModel.findAll<RateCheckinSelect>({
      where: {
        EMAILVEND: email,
        NOT: {
          STATUS: "RECUSADO",
        },
      },
      orderBy: {
        CREATEDAT: "desc",
      },
      take: faltantes,
      select: RATE_CHECKIN_SELECT,
    });

    return { rate: [...recusados, ...outros] };
  } catch (error) {
    throw error;
  }
}
}
export const rateService = new RateService();
