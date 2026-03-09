import { StatusCodes } from "http-status-codes";
import type { CreateSchemaDto } from "../../@types/interface/createSchema.dto";
import { CustomError } from "../../error";
import { schemaModel } from "../../models/schema";
import { checkinService } from "../checkin";

class SchemaService {
  async createSchema(body: CreateSchemaDto) {
    try {
      await checkinService.existID(body.CHECKINID);

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
