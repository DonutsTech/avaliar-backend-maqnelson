import type { CreateMarkWheelsDto } from "../../@types/interface/createMarkWheels.dto";
import { markWheelsModel } from "../../models/markWheels";
import { uuid } from "../../utils/uuid";
import { deletAccents } from "../../utils/word";

class MarkWheelsService {
  async create(body: CreateMarkWheelsDto) {
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

      const createMarkWheels = await markWheelsModel.create(body);

      return createMarkWheels;
    } catch (error) {
      throw error;
    }
  }

  async existMarkWheelsForName(name: string) {
    try {
      return await markWheelsModel.findBy({ NAME: name });
    } catch (error) {
      throw error;
    }
  }

  async existMarkWheelsForUuid(uuid: string) {
    try {
      return await markWheelsModel.findBy({ UUID: uuid });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const markWheel = await markWheelsModel.findAll();

      return { markWheel };
    } catch (error) {
      throw error;
    }
  }
}

export const markWheelsService = new MarkWheelsService();
