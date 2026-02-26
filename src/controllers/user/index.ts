import type { NextFunction, Request, Response } from "express";
import type { CreateUserDto } from "../../@types/interface/createUser.dto";
import { userService } from "../../services/user";

class UserController {
  async createUser(request: Request, response: Response, next: NextFunction) {
    try {
      const body: CreateUserDto = request.body;
      const create = await userService.createUser(body);
      return response.status(201).json(create);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(_request: Request, response: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      return response.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
