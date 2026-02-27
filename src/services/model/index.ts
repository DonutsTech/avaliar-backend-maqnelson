import type { CreateModelDto } from "../../@types/interface/createModel.dto";
import { modelModel } from "../../models/model";
import { schemaService } from "../schema";

class ModelService {
  async createModal(body: CreateModelDto) {
    try {
      await schemaService.existID(body.SCHEMAID);

      const createModal = await modelModel.create({
        NAME: body.NAME,
        TITLE: body.TITLE,
        QUESTION: body.QUESTION,
        PHOTO: body.PHOTO,
        BONDPHOTO: body.BONDPHOTO,
        LOCATION: body.LOCATION,
        SCHEMA: { connect: { ID: body.SCHEMAID } }
      })

      return createModal;
    } catch (error) {
      throw error;
    }
  }

  async existID(id: string) {
    if (!(await modelModel.count({ ID: id }))) {
      throw new Error('Modal não encontrado, por favor verifique o seu id');
    }
  }
}

export const modelService = new ModelService();
