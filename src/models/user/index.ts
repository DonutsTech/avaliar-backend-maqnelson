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

  async findAll() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findById(id: string) {
    try {
      return await prisma.user.findUnique({ where: { ID: id } });
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
