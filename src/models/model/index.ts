import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class ModelModel {
  async create(data: Prisma.ModelCreateInput) {
    try {
      return await prisma.model.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll() {
    try {
      return await prisma.model.findMany();
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findById(id: string) {
    try {
      return await prisma.model.findUnique({ where: { ID: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: Prisma.ModelUpdateInput) {
    try {
      return await prisma.model.update({ where: { ID: id }, data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: string) {
    try {
      return await prisma.model.delete({ where: { ID: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async count(find: Prisma.ModelWhereInput) {
    try {
      return await prisma.model.count({ where: find });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const modelModel = new ModelModel();
