import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class MarkWheels {
  async create(data: Prisma.MarkWheelsCreateInput): Promise<Prisma.MarkWheelsGetPayload<{ select: { NAME: true, UUID: true, ID: true } }>> {
    try {
      return await prisma.markWheels.create({ data, select: { NAME: true, UUID: true, ID: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(param: Prisma.MarkWheelsFindManyArgs): Promise<Prisma.MarkWheelsGetPayload<{ select: { NAME: true, UUID: true, ID: true } }>[] | null> {
    try {
      return await prisma.markWheels.findMany({ ...param, select: { NAME: true, UUID: true, ID: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy(where: Prisma.MarkWheelsWhereInput): Promise<Prisma.MarkWheelsGetPayload<{ select: { NAME: true, UUID: true, ID: true } }> | null> {
    try {
      return await prisma.markWheels.findFirst({ where, select: { NAME: true, UUID: true, ID: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: number, data: Prisma.MarkWheelsUpdateInput) {
    try {
      return await prisma.markWheels.update({ where: { ID: id }, data, select: { UPDATEDAT: false, CREATEDAT: false } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: number) {
    try {
      return await prisma.markWheels.delete({ where: { ID: id }, select: { UPDATEDAT: false, CREATEDAT: false } });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const markWheelsModel = new MarkWheels();
