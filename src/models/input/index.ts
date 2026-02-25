import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class InputModel {
  async create(data: Prisma.InputCreateInput) {
    try {
      return await prisma.input.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll() {
    try {
      return await prisma.input.findMany();
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findById(id: string) {
    try {
      return await prisma.input.findUnique({ where: { ID: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: Prisma.InputUpdateInput) {
    try {
      return await prisma.input.update({ where: { ID: id }, data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: string) {
    try {
      return await prisma.input.delete({ where: { ID: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const inputModel = new InputModel();
