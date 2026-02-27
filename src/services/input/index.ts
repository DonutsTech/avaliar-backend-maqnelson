import { StatusCodes } from "http-status-codes";
import type { CreateInputDto } from "../../@types/interface/createInput.dto";
import { CustomError } from "../../error";
import { inputModel } from "../../models/input";
import { modelService } from "../model";

class InputService {
  async createInput(body: CreateInputDto) {
    try {
      await modelService.existID(body.MODELID);

      const createInput = await inputModel.create({
        TYPE: body.TYPE,
        NAME: body.NAME,
        LABEL: body.LABEL,
        PLACEHOLDER: body.PLACEHOLDER,
        VALUE: "",
        REQUIRED: body.REQUIRED,
        MULTIPLE: body.MULTIPLE,
        BOND: body.BOND,
        ...(body.MIN !== undefined && { MIN: body.MIN }),
        ...(body.MAX !== undefined && { MAX: body.MAX }),
        BONDTYPE: body.BONDTYPE,
        MODEL: { connect: { ID: body.MODELID } }
      })

      return createInput;
    } catch (error) {
      throw error;
    }
  }

  async existID(id: string) {
    if (!(await inputModel.count({ ID: id }))) {
      throw new CustomError('Input não encontrado, por favor verifique o seu id', StatusCodes.NOT_FOUND);
    }
  }
}

export const inputService = new InputService();
