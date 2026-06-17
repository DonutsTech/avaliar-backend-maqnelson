import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class MarkWheels {
  async create(data: Prisma.MarkWheelsCreateInput) {
    try {
      return await prisma.markWheels.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll<T extends Prisma.MarkWheelsSelect = {}>(param: Prisma.MarkWheelsFindManyArgs) {
    try {
      return await prisma.markWheels.findMany(param) as Prisma.MarkWheelsGetPayload<{ select: T }>[] | [];
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy<T extends Prisma.MarkWheelsSelect = {}>(param: Prisma.MarkWheelsFindFirstArgs) {
    try {
      return await prisma.markWheels.findFirst(param) as Prisma.MarkWheelsGetPayload<{ select: T }> | null;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update<T extends Prisma.MarkWheelsSelect = {}>(id: number, data: Prisma.MarkWheelsUpdateInput, select: Prisma.MarkWheelsSelect = {}) {
    try {
      return await prisma.markWheels.update({ where: { ID: id }, data, select}) as Prisma.MarkWheelsGetPayload<{ select: T }>;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: number, select: Prisma.MarkWheelsSelect = {}) {
    try {
      return await prisma.markWheels.delete({ where: { ID: id }, select });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async count(where: Prisma.MarkWheelsWhereInput) {
    try {
      return await prisma.markWheels.count({ where });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const markWheelsModel = new MarkWheels();
