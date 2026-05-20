import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class VersionCheckinModel {
  async create<T extends Prisma.VersionCheckinCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.VersionCheckinCreateArgs>
  ): Promise<Prisma.VersionCheckinGetPayload<T>> {
    try {
      return await prisma.versionCheckin.create(args);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll<T extends Prisma.VersionCheckinSelect = {}>(param: Prisma.VersionCheckinFindManyArgs) {
    try {
      return await prisma.versionCheckin.findMany(param) as Prisma.VersionCheckinGetPayload<{ select: T }>[] | [];
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy<T extends Prisma.VersionCheckinSelect = {}>(param: Prisma.VersionCheckinFindFirstArgs) {
    try {
      return await prisma.versionCheckin.findFirst(param) as Prisma.VersionCheckinGetPayload<{ select: T }> | null;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update<T extends Prisma.VersionCheckinSelect = {}>(id: string, data: Prisma.VersionCheckinUpdateInput, select: Prisma.VersionCheckinSelect = {}) {
    try {
      return await prisma.versionCheckin.update({ where: { ID: id }, data, select }) as Prisma.VersionCheckinGetPayload<{ select: T }>;
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
