import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class VersionCheckinModel {
  async create(data: Prisma.VersionCheckinCreateInput): Promise<Prisma.VersionCheckinGetPayload<{ select: { ID: true, NAME: true, VERSION: true, IDCHECKIN: true, PHOTO: true, VIDEO: true, ATIVE: true, JSON_CHECKIN: true, OBJECT_CHECKIN: true } }>> {
    try {
      return await prisma.versionCheckin.create({ data, select: { ID: true, NAME: true, VERSION: true, IDCHECKIN: true, PHOTO: true, VIDEO: true, ATIVE: true, JSON_CHECKIN: true, OBJECT_CHECKIN: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(find: Prisma.VersionCheckinFindManyArgs): Promise<Prisma.VersionCheckinGetPayload<{ select: { ID: true, NAME: true, VERSION: true, IDCHECKIN: true, PHOTO: true, VIDEO: true, ATIVE: true, JSON_CHECKIN: true, OBJECT_CHECKIN: true } }>[] | null> {
    try {
      return await prisma.versionCheckin.findMany({ select: { ID: true, NAME: true, VERSION: true, IDCHECKIN: true, PHOTO: true, VIDEO: true, ATIVE: true, JSON_CHECKIN: true, OBJECT_CHECKIN: true }, ...find });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy(where: Prisma.VersionCheckinWhereInput): Promise<Prisma.VersionCheckinGetPayload<{ select: { ID: true, NAME: true, VERSION: true, IDCHECKIN: true, PHOTO: true, VIDEO: true, ATIVE: true, JSON_CHECKIN: true, OBJECT_CHECKIN: true } }> | null> {
    try {
      return await prisma.versionCheckin.findFirst({ where, select: { ID: true, NAME: true, VERSION: true, IDCHECKIN: true, PHOTO: true, VIDEO: true, ATIVE: true, JSON_CHECKIN: true, OBJECT_CHECKIN: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: Prisma.VersionCheckinUpdateInput): Promise<Prisma.VersionCheckinGetPayload<{ select: { ID: true, NAME: true, VERSION: true, IDCHECKIN: true, PHOTO: true, VIDEO: true, ATIVE: true, JSON_CHECKIN: true, OBJECT_CHECKIN: true } }>> {
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
