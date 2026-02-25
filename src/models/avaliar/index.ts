import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class AvaliarModel {
  async create(data: Prisma.AvaliarCreateInput) {
    try {
      return await prisma.avaliar.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll() {
    try {
      return await prisma.avaliar.findMany();
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findById(id: string) {
    try {
      return await prisma.avaliar.findUnique({ where: { ID: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: Prisma.AvaliarUpdateInput) {
    try {
      return await prisma.avaliar.update({ where: { ID: id }, data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: string) {
    try {
      return await prisma.avaliar.delete({ where: { ID: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const avaliarModel = new AvaliarModel();
