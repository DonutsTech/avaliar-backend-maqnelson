import type { CreateEmunDto } from "../../@types/interface/createEmun.dto";
import { emunModel } from "../../models/emun";
import { inputService } from "../input";

class EmunService {
  async createEmun(body: CreateEmunDto) {
    try {
      await inputService.existID(body.INPUTID);

      const emun = await emunModel.create({
        NAME: body.NAME,
        INPUT: { connect: { ID: body.INPUTID } }
      });

      return emun;
    } catch (error) {
      throw error;
    }
  }
}

export const emunService = new EmunService();
