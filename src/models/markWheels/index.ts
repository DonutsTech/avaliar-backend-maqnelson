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

  async findAll() {
    try {
      return await prisma.markWheels.findMany();
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy(where: Prisma.MarkWheelsWhereInput) {
    try {
      return await prisma.markWheels.findFirst({ where });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: Prisma.MarkWheelsUpdateInput) {
    try {
      return await prisma.markWheels.update({ where: { ID: id }, data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: string) {
    try {
      return await prisma.markWheels.delete({ where: { ID: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const markWheelsModel = new MarkWheels();
