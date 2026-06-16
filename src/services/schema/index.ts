import { StatusCodes } from "http-status-codes";
import type { CreateSchema } from "../../@types/interface/schema";
import { CustomError } from "../../error";
import { schemaModel } from "../../models/schema";
import { formService } from "../form";

class SchemaService {
  async createSchema(body: CreateSchema) {
    try {
      await formService.existID(body.CHECKINID);

      const createSchema = await schemaModel.create({
        TITLE: body.TITLE,
        CHECKIN: { connect: { ID: body.CHECKINID } }
      })

      return createSchema;
    } catch (error) {
      throw error;
    }
  }

  async existID(id: string) {
    if (!(await schemaModel.count({ ID: id }))) {
      throw new CustomError('Schema não encontrado, por favor verifique o seu id', StatusCodes.NOT_FOUND);
    }
  }

  async deleteSchema(id: string) {
    try {
      await this.existID(id);
      await schemaModel.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export const schemaService = new SchemaService();
