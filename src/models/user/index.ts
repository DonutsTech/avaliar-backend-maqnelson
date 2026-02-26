import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class UserModel {
  async create(data: Prisma.UserCreateInput) {
    try {
      return await prisma.user.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(params?: Prisma.UserFindManyArgs) {
    try {
      return await prisma.user.findMany(params);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy(find: Prisma.UserWhereInput) {
    try {
      return await prisma.user.findFirst({ where: find });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async count(find: Prisma.UserWhereInput) {
    try {
      return await prisma.user.count({ where: find });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    try {
      return await prisma.user.update({ where: { ID: id }, data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: string) {
    try {
      return await prisma.user.delete({ where: { ID: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const userModel = new UserModel();
