import bycrpt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import type { CreateUserDto } from "../../@types/interface/createUser.dto";
import { CustomError } from '../../error';
import { userModel } from "../../models/user";

class UserService {
  async createUser(body: CreateUserDto) {
    try {
      const { ROLE, EMAIL, PASSWORD } = body;

      const passwordHash = await bycrpt.hash(PASSWORD, await bycrpt.genSalt(10));

      const user = await userModel.create({
        EMAIL,
        PASSWORD: passwordHash,
        ...(ROLE && { ROLE })
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    try {
      const users = await userModel.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async existId(id: string) {
    if (!(await userModel.count({ ID: id }))) {
      throw new CustomError('Usuario não encontrado, por favor verifique o seu id', StatusCodes.NOT_FOUND);
    }
  }

  async showId(id: string) {
    try {
      await this.existId(id);

      const user = await userModel.findBy({ ID: id });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
