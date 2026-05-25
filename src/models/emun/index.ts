import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class EmunModel {
  async create(data: Prisma.EmunCreateInput) {
    try {
      return await prisma.emun.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll<T extends Prisma.EmunSelect = {}>(param: Prisma.EmunFindManyArgs) {
    try {
      return await prisma.emun.findMany(param) as Prisma.EmunGetPayload<{ select: T }>[] | [];
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy<T extends Prisma.EmunSelect = {}>(param: Prisma.EmunFindFirstArgs) {
    try {
      return await prisma.emun.findFirst(param) as Prisma.EmunGetPayload<{ select: T }> | null;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update<T extends Prisma.EmunSelect = {}>(id: string, data: Prisma.EmunUpdateInput, select: Prisma.EmunSelect = {}) {
    try {
      return await prisma.emun.update({ where: { ID: id }, data, select }) as Prisma.EmunGetPayload<{ select: T }>;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete<T extends Prisma.EmunSelect = {}>(id: string, select: Prisma.EmunSelect = {}) {
    try {
      return await prisma.emun.delete({ where: { ID: id }, select }) as Prisma.EmunGetPayload<{ select: T }>;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async count(find: Prisma.EmunWhereInput): Promise<number> {
    try {
      return await prisma.emun.count({ where: find });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const emunModel = new EmunModel();
