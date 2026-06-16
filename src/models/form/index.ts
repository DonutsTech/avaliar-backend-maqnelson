import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class FormModel {
  async create(data: Prisma.CheckinCreateInput) {
    try {
      return await prisma.checkin.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findMany<T extends Prisma.CheckinInclude = {}>(param: Prisma.CheckinFindManyArgs) {
    try {
      return (await prisma.checkin.findMany(param) as Prisma.CheckinGetPayload<{ include: T }>[] | []);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy<T extends Prisma.CheckinInclude = {}>(params: Prisma.CheckinFindFirstArgs) {
    try {
      return (await prisma.checkin.findFirst(params) as Prisma.CheckinGetPayload<{ include: T }> | null);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: Prisma.CheckinUpdateInput) {
    try {
      return await prisma.checkin.update({ where: { ID: id }, data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: string) {
    try {
      return await prisma.checkin.delete({ where: { ID: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async count(find: Prisma.CheckinWhereInput) {
    try {
      return await prisma.checkin.count({ where: find });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const formModel = new FormModel();
