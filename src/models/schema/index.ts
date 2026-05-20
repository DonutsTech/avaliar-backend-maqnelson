import { handlePrismaError } from "../../error";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";

class SchemaModel {
  async create(data: Prisma.SchemaCreateInput) {
    try {
      return await prisma.schema.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(param: Prisma.SchemaFindManyArgs) {
    try {
      return await prisma.schema.findMany(param);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findBy(param: Prisma.SchemaFindFirstArgs) {
    try {
      return await prisma.schema.findFirst(param);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: Prisma.SchemaUpdateInput) {
    try {
      return await prisma.schema.update({ where: { ID: id }, data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: string) {
    try {
      return await prisma.schema.delete({ where: { ID: id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async count(find: Prisma.SchemaWhereInput) {
    try {
      return await prisma.schema.count({ where: find });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}

export const schemaModel = new SchemaModel();
