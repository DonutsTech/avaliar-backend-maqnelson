import type { NextFunction, Request, Response } from 'express';
import type { CreateUser } from '../../@types/interface/user';
import { userService } from '../../services/user';

class UserController {
  async createUser(request: Request, response: Response, next: NextFunction) {
    try {
      const body: CreateUser = request.body;
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

  async getUserByEmail(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const param: { cEmail: string } = request.query as any;
      const user = await userService.getUserByEmail(param.cEmail);
      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
