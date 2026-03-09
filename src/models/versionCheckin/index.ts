import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class VersionCheckinModel {
  async create(data: Prisma.VersionCheckinCreateInput) {
    try {
      return await prisma.versionCheckin.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(find: Prisma.VersionCheckinFindManyArgs) {
    try {
      return await prisma.versionCheckin.findMany({ ...find });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy(where: Prisma.VersionCheckinWhereInput) {
    try {
      return await prisma.versionCheckin.findFirst({ where });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: Prisma.VersionCheckinUpdateInput) {
    try {
      return await prisma.versionCheckin.update({ where: { ID: id }, data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: string) {
    try {
      return await prisma.versionCheckin.delete({ where: { ID: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async count(find: Prisma.VersionCheckinWhereInput) {
    try {
      return await prisma.versionCheckin.count({ where: find });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const versionCheckinModel = new VersionCheckinModel();
