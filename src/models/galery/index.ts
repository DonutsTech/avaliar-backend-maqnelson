import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/browser";
import { prisma } from "../../prisma";

class GaleryModel {
  async create(data: Prisma.GaleryRateCreateInput) {
    try {
      return await prisma.galeryRate.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findMany<T extends Prisma.GaleryRateInclude = {}>(param: Prisma.GaleryRateFindManyArgs) {
    try {
      return (await prisma.galeryRate.findMany(param) as Prisma.GaleryRateGetPayload<{ include: T }>[] | []);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy<T extends Prisma.GaleryRateInclude = {}>(params: Prisma.GaleryRateFindFirstArgs) {
    try {
      return (await prisma.galeryRate.findFirst(params) as Prisma.GaleryRateGetPayload<{ include: T }> | null);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: number, data: Prisma.GaleryRateUpdateInput) {
    try {
      return await prisma.galeryRate.update({ where: { ID: id }, data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: number) {
    try {
      return await prisma.galeryRate.delete({ where: { ID: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async count(find: Prisma.GaleryRateWhereInput) {
    try {
      return await prisma.galeryRate.count({ where: find });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const galeryModel = new GaleryModel();
