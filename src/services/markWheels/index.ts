import type { CreateMarkWheelsDto } from "../../@types/interface/createMarkWheels.dto";
import { markWheelsModel } from "../../models/markWheels";

class MarkWheelsService {
  async create(body: CreateMarkWheelsDto) {
    try {
      const name = body.NAME.toUpperCase();

      const existMarkWheels = await this.existMarkWheelsForName(name);

      if (existMarkWheels) {
        return existMarkWheels;
      }

      const existMarkWheelsForUuid = await this.existMarkWheelsForUuid(body.UUID);

      if (existMarkWheelsForUuid) {
        return existMarkWheelsForUuid;
      }

      const createMarkWheels = await markWheelsModel.create({
        NAME: name,
        UUID: body.UUID,
      });

      return createMarkWheels;
    } catch (error) {
      throw error;
    }
  }

  async existMarkWheelsForName(name: string) {
    try {
      return await markWheelsModel.findBy({ NAME: name.toUpperCase() });
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
      return await markWheelsModel.findAll();
    } catch (error) {
      throw error;
    }
  }
}

export const markWheelsService = new MarkWheelsService();
