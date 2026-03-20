import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class RateModel {
  async create(data: Prisma.RateCreateInput) {
    try {
      return await prisma.rate.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(param: Prisma.RateFindManyArgs) {
    try {
      return await prisma.rate.findMany(param);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy(where: Prisma.RateWhereInput) {
    try {
      return await prisma.rate.findFirst({ where });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: number, data: Prisma.RateUpdateInput) {
    try {
      return await prisma.rate.update({ where: { ID: id }, data });
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
