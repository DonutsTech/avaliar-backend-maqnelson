import type { CreateEmunDto } from "../../@types/interface/createEmun.dto";
import { emunModel } from "../../models/emun";
import { inputService } from "../input";

class EmunService {
  async createEmun(body: CreateEmunDto) {
    try {
      await inputService.existID(body.INPUTID);

      const emun = await emunModel.create({
        NAME: body.NAME,
        TITLE: body.TITLE,
        INPUT: { connect: { ID: body.INPUTID } }
      });

      return emun;
    } catch (error) {
      throw error;
    }
  }

  async existID(id: string) {
    if (!(await emunModel.count({ ID: id }))) {
      throw new Error('Emun não encontrado, por favor verifique o seu id');
    }
  }

  async deleteEmun(id: string) {
    try {
      await this.existID(id);
      await emunModel.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export const emunService = new EmunService();
