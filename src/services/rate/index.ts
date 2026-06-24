import type {
  CreateRateForm,
  RateForminSelect,
  RateSelect,
} from '../../@types/interface/rate';
import type { Prisma, Rate, User } from '../../generated/prisma/browser';
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
              MODEL: item.MODEL,
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

  async getRateLimitTennForHomeUser(email: string): Promise<{
    rates: Rate[];
    result: { STATUS: string; _count: { STATUS: number } }[];
  }> {
    try {
      const result = await prisma.rate.groupBy({
        by: ['STATUS'],
        where: {
          EMAILVEND: email,
        },
        _count: {
          STATUS: true,
        },
      });

      const rates = (await rateModel.findAll({
        where: {
          EMAILVEND: email,
        },
        orderBy: {
          CREATEDAT: 'desc',
        },
        take: 10,
      })) as Rate[];

      return { rates, result };
    } catch (error) {
      throw error;
    }
  }

  async getRateLimitTennForHomeAll(): Promise<{
    rates: Rate[];
    result: { STATUS: string; _count: { STATUS: number } }[];
  }> {
    try {
      const result = await prisma.rate.groupBy({
        by: ['STATUS'],
        _count: {
          STATUS: true,
        },
      });

      const rates = (await rateModel.findAll({
        orderBy: {
          CREATEDAT: 'desc',
        },
        take: 10,
      })) as Rate[];

      return { rates, result };
    } catch (error) {
      throw error;
    }
  }

  async getRateLimitTennForHome(
    email: string,
    user: User,
  ): Promise<{
    rates: Rate[];
    result: { STATUS: string; _count: { STATUS: number } }[];
  }> {
    try {
      if (user.ROLE === 'USER') {
        return this.getRateLimitTennForHomeUser(email);
      }

      return this.getRateLimitTennForHomeAll();
    } catch (error) {
      throw error;
    }
  }

  async getRateUserForWebPages(email: string, page: number, limit: number) {
    try {
      const [rates, total] = await Promise.all([
        prisma.rate.findMany({
          where: {
            EMAILVEND: email,
          },
          orderBy: {
            CREATEDAT: 'desc',
          },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.rate.count({
          where: {
            EMAILVEND: email,
          },
        }),
      ]);

      return {
        rates,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async getRateAllForWebPages(page: number, limit: number) {
    try {
      const [rates, total] = await Promise.all([
        prisma.rate.findMany({
          orderBy: {
            CREATEDAT: 'desc',
          },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.rate.count(),
      ]);

      return {
        rates,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async getRateForWebPages(
    email: string,
    page: number,
    limit: number,
    user: User,
  ) {
    try {
      if (user.ROLE === 'USER') {
        return this.getRateUserForWebPages(email, page, limit);
      }

      return this.getRateAllForWebPages(page, limit);
    } catch (error) {
      throw error;
    }
  }

  async updateRate(id: number, data: CreateRateForm) {
    try {
      await this.existById(id);

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
}
export const rateService = new RateService();
