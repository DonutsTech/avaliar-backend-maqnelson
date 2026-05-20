import type { CreateRateCheckinDto, UpdateRateDto } from "../../@types/interface/createRate.dto";
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

type RateSelect = {
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
  VALUE1YEAR: true,
  VALUE2YEAR: true,
  VALUE3YEAR: true,
  VALUE4YEAR: true,
  TAXA: true,
  VALUEVIEW: true,
  VALUERATE: true,
  VALIDITY: true,
  VALUESUG: true,
  FILIAL_WEB: true,
  CANAL: true,
  RESSED: true,
  MODALITY: true,
  VALUEBY: true,
  VALUENEG: true,
  STOKE: true,
  REASON: true,
  OBSREASON: true,
  INDICATOR: true,
  WHO: true,
  OBSALL: true,
  GALERYRATES: {
    select: {
      ID: true,
      URL: true,
    },
  },
  CREATEDAT: true,
  UPDATEDAT: true,
  VERSIONCHECKIN: {
    select: {
      JSON_CHECKIN: true,
    }
  }
}

const RATE_SELECT: Prisma.RateSelect = {
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
  VALUE1YEAR: true,
  VALUE2YEAR: true,
  VALUE3YEAR: true,
  VALUE4YEAR: true,
  TAXA: true,
  VALUEVIEW: true,
  VALUERATE: true,
  VALIDITY: true,
  VALUESUG: true,
  FILIAL_WEB: true,
  CANAL: true,
  RESSED: true,
  MODALITY: true,
  VALUEBY: true,
  VALUENEG: true,
  STOKE: true,
  REASON: true,
  OBSREASON: true,
  INDICATOR: true,
  WHO: true,
  OBSALL: true,
  GALERYRATES: {
    select: {
      ID: true,
      URL: true,
    },
  },
  CREATEDAT: true,
  UPDATEDAT: true,
  VERSIONCHECKIN: {
    select: {
      JSON_CHECKIN: true,
    }
  }
}

class RateService {
  async existById(id: number) {
    try {
      if (!(await rateModel.count({ ID: id }))) {
        throw new Error("Avaliação não encontrada");
      }
    } catch (error) {
      throw error;
    }
  }
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

  async filterAll() {
    try {
      const rates = await rateModel.findAll<RateSelect>({
        select: RATE_SELECT,
      });

      return rates;
    } catch (error) {
      throw error;
    }
  }

  async updateRate(id: number, data: UpdateRateDto) {
    try {
      await this.existById(id);

      const rate = await rateModel.update<RateSelect>(id, data, RATE_SELECT);

      return rate;
    } catch (error) {
      throw error;
    }
  }
}
export const rateService = new RateService();
