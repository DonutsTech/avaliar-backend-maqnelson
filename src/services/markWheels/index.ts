import type { CreateMarkWheels } from "../../@types/interface/markWheels";
import { markWheelsModel } from "../../models/markWheels";
import { uuid } from "../../utils/uuid";
import { deletAccents } from "../../utils/word";

class MarkWheelsService {
  async create(body: CreateMarkWheels) {
    try {
      body.NAME = deletAccents(body.NAME.toUpperCase());

      const existMarkWheels = await this.existMarkWheelsForName(body.NAME);

      if (existMarkWheels) {
        return existMarkWheels;
      }

      if (body.UUID && body.UUID !== "") {
        const existMarkWheelsForUuid = await this.existMarkWheelsForUuid(body.UUID);

        if (existMarkWheelsForUuid) {
          return existMarkWheelsForUuid;
        }
      }

      if (body.UUID === "") {
        body.UUID = await uuid();
      }

      const createMarkWheels = await markWheelsModel.create({
        NAME: body.NAME,
        UUIDAPP: body.UUID
      });

      return createMarkWheels;
    } catch (error) {
      throw error;
    }
  }

  async existMarkWheelsForName(name: string) {
    try {
      return await markWheelsModel.findBy({ where: { NAME: name } });
    } catch (error) {
      throw error;
    }
  }

  async existMarkWheelsForUuid(uuid: string) {
    try {
      return await markWheelsModel.findBy({ where: { UUIDAPP: uuid } });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const markWheel = await markWheelsModel.findAll({});

      return { markWheel };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const existMarkWheels = await markWheelsModel.findBy({ where: { UUIDAPP: id } });

      if (!existMarkWheels) {
        throw new Error("MarkWheel not found");
      }

      await markWheelsModel.delete(Number(id));

      return { message: "MarkWheel deletado com sucesso" };
    } catch (error) {
      throw error;
    }
  }
}

export const markWheelsService = new MarkWheelsService();
