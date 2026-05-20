import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class RateModel {
  async create<T extends Prisma.RateCreateArgs>(args: Prisma.SelectSubset<T, Prisma.RateCreateArgs>): Promise<Prisma.RateGetPayload<T>> {
    try {
      return await prisma.rate.create(args);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll<T extends Prisma.RateSelect = {}>(param: Prisma.RateFindManyArgs) {
    try {
      return (await prisma.rate.findMany(param) as Prisma.RateGetPayload<{ select: T }>[] | []);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy<T extends Prisma.RateSelect = {}>(param: Prisma.RateFindFirstArgs) {
    try {
      return await prisma.rate.findFirst(param) as Prisma.RateGetPayload<{ select: T }> | null;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update<T extends Prisma.RateSelect = {}>(id: number, data: Prisma.RateUpdateInput, select: Prisma.RateSelect = {} as any) {
    try {
      return await prisma.rate.update({ where: { ID: id }, data, select: select }) as Prisma.RateGetPayload<{ select: T }>;
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

  async count(where: Prisma.RateWhereInput): Promise<number> {
    try {
      return await prisma.rate.count({ where });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const rateModel = new RateModel();
