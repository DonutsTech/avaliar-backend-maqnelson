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

  async findAll() {
    try {
      return await prisma.checkin.findMany();
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findById(id: string) {
    try {
      return await prisma.checkin.findUnique({ where: { ID: id } });
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
}

export const checkinModel = new CheckinModel();
