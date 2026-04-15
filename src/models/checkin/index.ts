import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class CheckinModel {
  async create(data: Prisma.CheckinCreateInput) {
    try {
      return await prisma.checkin.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(param: Prisma.CheckinFindManyArgs) {
    try {
      return await prisma.checkin.findMany({ ...param });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy(find?: Prisma.CheckinWhereInput, select?: Prisma.CheckinSelect) {
    try {
      const args: any = {};
      if (find !== undefined) args.where = find;
      if (select !== undefined) args.select = select;
      return await prisma.checkin.findFirst({ ...args });
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

export const checkinModel = new CheckinModel();
