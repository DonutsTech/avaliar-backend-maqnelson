import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class EmunModel {
  async create(data: Prisma.EmunCreateInput): Promise<Prisma.EmunGetPayload<{ select: { ID: true, IDINPUT: true, NAME: true, TITLE: true } }>> {
    try {
      return await prisma.emun.create({ data, select: { ID: true, IDINPUT: true, NAME: true, TITLE: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(param: Prisma.EmunFindManyArgs): Promise<Prisma.EmunGetPayload<{ select: { ID: true, IDINPUT: true, NAME: true, TITLE: true } }>[] | null> {
    try {
      return await prisma.emun.findMany({ ...param, select: { ID: true, IDINPUT: true, NAME: true, TITLE: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findById(id: string) {
    try {
      return await prisma.emun.findUnique({ where: { ID: id }, select: { ID: true, IDINPUT: true, NAME: true, TITLE: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: Prisma.EmunUpdateInput): Promise<Prisma.EmunGetPayload<{ select: { ID: true, IDINPUT: true, NAME: true, TITLE: true } }>> {
    try {
      return await prisma.emun.update({ where: { ID: id }, data, select: { ID: true, IDINPUT: true, NAME: true, TITLE: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: string): Promise<Prisma.EmunGetPayload<{ select: { ID: true, IDINPUT: true, NAME: true, TITLE: true } }>> {
    try {
      return await prisma.emun.delete({ where: { ID: id }, select: { ID: true, IDINPUT: true, NAME: true, TITLE: true } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async count(find: Prisma.EmunWhereInput): Promise<number> {
    try {
      return await prisma.emun.count({ where: find });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const emunModel = new EmunModel();
