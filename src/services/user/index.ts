import bycrpt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../error';
import { userModel } from "../../models/user";
import type { CreateUser } from '../../@types/interface/user';

class UserService {
  async createUser(body: CreateUser) {
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
      const users = await userModel.findAll({});
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

      const user = await userModel.findBy({ where: { ID: id } });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async existEmail(email: string) : Promise<boolean> {
    if (!(await userModel.count({ EMAIL: email }))) {
      return true;
    }

    return false;
  }

  async getUserByEmail(email: string) {
    try {
      const existEmail = await this.existEmail(email);

      if (existEmail) {
        const user = await userModel.findBy({ where: { ROLE: 'USER' } });

        return user;
      }

      const user = await userModel.findBy({ where: { EMAIL: email } });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
