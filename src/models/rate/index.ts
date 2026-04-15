import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class RateModel {
  async create(data: Prisma.RateCreateInput): Promise<Prisma.RateGetPayload<{ select: { CODCLI: true, CODPROS: true, CODVEND: true, EMAILVEND: true, ID: true, IDVERSIONCHECKIN: true, LJCLI: true, LJPROS: true, RESULT: true, STATUS: true, UUID: true, VERSIONCHECKIN: true } }>> {
    try {
      return await prisma.rate.create({ data, select: { CODCLI: true, CODPROS: true, CODVEND: true, EMAILVEND: true, ID: true, IDVERSIONCHECKIN: true, LJCLI: true, LJPROS: true, RESULT: true, STATUS: true, UUID: true, VERSIONCHECKIN: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(param: Prisma.RateFindManyArgs): Promise<Prisma.RateGetPayload<{ select: { CODCLI: true, CODPROS: true, CODVEND: true, EMAILVEND: true, ID: true, IDVERSIONCHECKIN: true, LJCLI: true, LJPROS: true, RESULT: true, STATUS: true, UUID: true, VERSIONCHECKIN: true } }>[] | null> {
    try {
      return await prisma.rate.findMany({ ...param, select: { CODCLI: true, CODPROS: true, CODVEND: true, EMAILVEND: true, ID: true, IDVERSIONCHECKIN: true, LJCLI: true, LJPROS: true, RESULT: true, STATUS: true, UUID: true, VERSIONCHECKIN: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy(where: Prisma.RateWhereInput): Promise<Prisma.RateGetPayload<{ select: { CODCLI: true, CODPROS: true, CODVEND: true, EMAILVEND: true, ID: true, IDVERSIONCHECKIN: true, LJCLI: true, LJPROS: true, RESULT: true, STATUS: true, UUID: true, VERSIONCHECKIN: true } }> | null> {
    try {
      return await prisma.rate.findFirst({ where, select: { CODCLI: true, CODPROS: true, CODVEND: true, EMAILVEND: true, ID: true, IDVERSIONCHECKIN: true, LJCLI: true, LJPROS: true, RESULT: true, STATUS: true, UUID: true, VERSIONCHECKIN: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: number, data: Prisma.RateUpdateInput): Promise<Prisma.RateGetPayload<{ select: { CODCLI: true, CODPROS: true, CODVEND: true, EMAILVEND: true, ID: true, IDVERSIONCHECKIN: true, LJCLI: true, LJPROS: true, RESULT: true, STATUS: true, UUID: true, VERSIONCHECKIN: true } }>> {
    try {
      return await prisma.rate.update({ where: { ID: id }, data, select: { CODCLI: true, CODPROS: true, CODVEND: true, EMAILVEND: true, ID: true, IDVERSIONCHECKIN: true, LJCLI: true, LJPROS: true, RESULT: true, STATUS: true, UUID: true, VERSIONCHECKIN: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: number) {
    try {
      return await prisma.rate.delete({ where: { ID: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const rateModel = new RateModel();
