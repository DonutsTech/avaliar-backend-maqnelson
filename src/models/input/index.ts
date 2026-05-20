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

  async findAll<T extends Prisma.InputSelect = {}>(param: Prisma.InputFindManyArgs) {
    try {
      return await prisma.input.findMany(param) as Prisma.InputGetPayload<{ select: T }>[] | [];
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy<T extends Prisma.InputSelect = {}>(param: Prisma.InputFindFirstArgs) {
    try {
      return await prisma.input.findFirst(param) as Prisma.InputGetPayload<{ select: T}> | null;
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

  async count(find: Prisma.InputWhereInput) {
    try {
      return await prisma.input.count({ where: find });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const inputModel = new InputModel();
