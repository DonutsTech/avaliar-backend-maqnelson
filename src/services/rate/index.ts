import type {
  CreateRateForm,
  PutRateFinance,
  PutRateStatus,
  RateForminSelect,
  RateSelect,
} from '../../@types/interface/rate';
import type { Prisma, User } from '../../generated/prisma/browser';
import { rateModel } from '../../models/rate';
import { prisma } from '../../prisma';
import { versionForminService } from '../versionForm';

const RATE_FORM_SELECT: Prisma.RateSelect = {
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
  PHOTO: true,
  MESSAGE: true,
  MARK_WEB: true,
  MODEL_WEB: true,
  YEAR: true,
};

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
    },
  },
  PHOTO: true,
  MESSAGE: true,
  MODEL_WEB: true,
  MARK_WEB: true,
  YEAR: true,
};

class RateService {
  async existById(id: number) {
    try {
      if (!(await rateModel.count({ ID: id }))) {
        throw new Error('Avaliação não encontrada');
      }
    } catch (error) {
      throw error;
    }
  }

  async createRate(body: { rate: CreateRateForm[] }) {
    try {
      const newArray = [];

      for (const item of body.rate) {
        await versionForminService.existID(item.IDVERSIONCHECKIN);

        const existUuid = await rateModel.findBy<RateForminSelect>({
          where: { UUIDAPP: item.UUIDAPP },
          select: RATE_FORM_SELECT,
        });

        if (existUuid) {
          const updateRate = await this.updateRate(existUuid.ID, {
            ...item,
            STATUS: 'EM ANDAMENTO',
          });

          newArray.push(updateRate);
          continue;
        }

        if (!existUuid) {
          const createRate = await rateModel.create({
            data: {
              UUIDAPP: item.UUIDAPP,
              CODVEND: item.CODVEND,
              FILIAL: item.FILIAL,
              NAMEVEND: item.NAMEVEND,
              EMAILVEND: item.EMAILVEND,
              RESULT: item.RESULT,
              TYPE: item.TYPE,
              MARK: item.MARK,
              MARK_WEB: item.MARK_WEB,
              MODEL: item.MODEL,
              MODEL_WEB: item.MODEL_WEB,
              CHASSI: item.CHASSI,
              VALUE: item.VALUE,
              DATE: item.DATE,
              CODCLI: item.CODCLI,
              LJCLI: item.LJCLI,
              CODPROS: item.CODPROS,
              LJPROS: item.LJPROS,
              NAMECLI: item.NAMECLI,
              ADDRESSCLI: item.ADDRESSCLI,
              PHONECLI: item.PHONECLI,
              EMAILCLI: item.EMAILCLI,
              PHOTO: item.PHOTO,
              YEAR: item.YEAR,
              HISTORY: `{ DATE:${new Date().toISOString()}, WHO:${item.NAMEVEND}, STATUS: EM ANDAMENTO, MESSAGE: Iniciada a avaliação}`,
              VERSIONCHECKIN: { connect: { ID: item.IDVERSIONCHECKIN } },
            },
            select: RATE_FORM_SELECT,
          });

          newArray.push(createRate);
        }
      }

      return { rate: newArray, success: true };
    } catch (error) {
      return { rate: [], success: false };
    }
  }

  async filterRateForminEmailVend(email: string) {
    try {
      const recusados = await rateModel.findAll<RateSelect>({
        where: {
          EMAILVEND: email,
          STATUS: 'RECUSADO',
        },
        select: RATE_SELECT,
      });

      const faltantes = 10 - recusados.length;

      if (faltantes <= 0) {
        return { rate: recusados };
      }

      const outros = await rateModel.findAll<RateSelect>({
        where: {
          EMAILVEND: email,
          NOT: {
            STATUS: 'RECUSADO',
          },
        },
        orderBy: {
          CREATEDAT: 'desc',
        },
        take: faltantes,
        select: RATE_SELECT,
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

  async groupByStatus(email: string | undefined): Promise<{
    statuscount: { STATUS: string; _count: { STATUS: number } }[];
  }> {
    try {
      const result = await prisma.rate.groupBy({
        by: ['STATUS'],
        ...(email && {
          where: {
            EMAILVEND: email,
          },
        }),
        _count: {
          STATUS: true,
        },
      });

      return { statuscount: result };
    } catch (error) {
      throw error;
    }
  }

  async getRatesAll(email: string | undefined) {
    try {
      const rates = await rateModel.findAll({
        ...(email && {
          where: {
            EMAILVEND: email,
          },
        }),
        orderBy: {
          CREATEDAT: 'desc',
        },
        include: {
          GALERYRATES: true,
          VERSIONCHECKIN: true,
        },
      });

      return { rates: rates };
    } catch (error) {
      throw error;
    }
  }

  async countStatusForWeb(email: string, user: User) {
    try {
      if (user.ROLE === 'USER') {
        return await this.groupByStatus(email);
      }

      return await this.groupByStatus(undefined);
    } catch (error) {
      throw error;
    }
  }

  async getRateForWeb(email: string, user: User) {
    try {
      if (user.ROLE === 'USER') {
        return await this.getRatesAll(email);
      }

      return await this.getRatesAll(undefined);
    } catch (error) {
      throw error;
    }
  }

  async updateRate(id: number, data: CreateRateForm) {
    try {
      await this.existById(id);

      const status = await rateModel.findBy<{ HISTORY: true; STATUS: true }>({
        where: { ID: id },
        select: { HISTORY: true, STATUS: true },
      });

      if (!status) {
        throw new Error('Avaliação não encontrada');
      }

      const rate = await rateModel.update<RateForminSelect>(
        id,
        {
          UUIDAPP: data.UUIDAPP,
          CODVEND: data.CODVEND,
          FILIAL: data.FILIAL,
          NAMEVEND: data.NAMEVEND,
          EMAILVEND: data.EMAILVEND,
          RESULT: data.RESULT,
          TYPE: data.TYPE,
          MARK: data.MARK,
          MODEL: data.MODEL,
          CHASSI: data.CHASSI,
          VALUE: data.VALUE,
          DATE: data.DATE,
          CODCLI: data.CODCLI,
          LJCLI: data.LJCLI,
          CODPROS: data.CODPROS,
          LJPROS: data.LJPROS,
          NAMECLI: data.NAMECLI,
          ADDRESSCLI: data.ADDRESSCLI,
          PHONECLI: data.PHONECLI,
          EMAILCLI: data.EMAILCLI,
          STATUS: data.STATUS,
          PHOTO: data.PHOTO,
          MESSAGE: data.MESSAGE,
          MODEL_WEB: data.MODEL_WEB,
          YEAR: data.YEAR,
          MARK_WEB: data.MARK_WEB,
          ...(status.STATUS !== data.STATUS
            ? {
                HISTORY: `${status.HISTORY || ''} {DATE:${new Date().toISOString()}, WHO:${data.NAMEVEND}, STATUS:${data.STATUS}, MESSAGE: 'Alteração de status'}`,
              }
            : {}),
          VERSIONCHECKIN: { connect: { ID: data.IDVERSIONCHECKIN } },
        },
        RATE_FORM_SELECT,
      );

      return rate;
    } catch (error) {
      throw error;
    }
  }

  async existRateForUuid(uuid: string): Promise<boolean> {
    try {
      const rate = await rateModel.findBy<RateSelect>({
        where: { UUIDAPP: uuid },
        select: RATE_SELECT,
      });

      if (!rate) {
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async putRateStatus(id: number, data: PutRateStatus) {
    try {
      await this.existById(id);

      const rate = await rateModel.findBy<{ HISTORY: true; GALERYRATES: true }>(
        {
          where: { ID: id },
          select: { HISTORY: true, GALERYRATES: true },
        },
      );

      if (!rate) {
        throw new Error('Avaliação não encontrada');
      }

      await rateModel.update<RateForminSelect>(
        id,
        {
          STATUS: data.STATUS,
          ...(data.ACCEPTED !== '' && { ACCEPTED: data.ACCEPTED }),
          ...(data.APPROVED !== '' && { APPROVED: data.APPROVED }),
          HISTORY: `${rate.HISTORY || ''} { DATE:${new Date().toISOString()}, WHO:${data.WHO}, STATUS: ${data.STATUS}, MESSAGE: ${data.MESSAGE}}`,
          MESSAGE: data.MESSAGE,
        },
        RATE_FORM_SELECT,
      );

      const galery = rate.GALERYRATES.some(doc =>
        ['cnd', 'nf'].includes(doc.NAME),
      );

      if (galery === false && data.STATUS === 'APROVADO') {
        await rateModel.update<RateForminSelect>(
          id,
          {
            STATUS: 'PENDENTE',
            HISTORY: `${rate.HISTORY || ''} { DATE:${new Date().toISOString()}, WHO:${data.WHO}, STATUS: 'PENDENTE', MESSAGE: Documentos pendentes: CND e NF - Para liberar utilize o sistema web}`,
            MESSAGE: `Documentos pendentes: CND e NF - Para liberar utilize o sistema web`,
          },
          RATE_FORM_SELECT,
        );
      }

      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async putRateFinance(id: number, data: PutRateFinance) {
    try {
      await this.existById(id);

      await rateModel.update<RateForminSelect>(
        id,
        {
          CANAL: data.CANAL,
          FILIAL_WEB: data.FILIAL_WEB,
          VALUE1YEAR: data.VALUE1YEAR,
          VALUE2YEAR: data.VALUE2YEAR,
          VALUE3YEAR: data.VALUE3YEAR,
          VALUE4YEAR: data.VALUE4YEAR,
          TAXA: data.TAXA,
          STOKE: data.STOKE,
          OBSREASON: data.OBSREASON,
          VALUEBY: data.VALUEBY,
          VALUENEG: data.VALUENEG,
          RESSED: data.RESSED,
          WHO: data.WHO,
          INDICATOR: data.INDICATOR,
          VALUERATE: data.VALUERATE,
          VALUESUG: data.VALUESUG,
          VALIDITY: data.VALIDITY,
          VALUEVIEW: data.VALUEVIEW,
          MODALITY: data.MODALITY,
        },
        RATE_FORM_SELECT,
      );

      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}
export const rateService = new RateService();
