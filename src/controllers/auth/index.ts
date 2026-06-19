import type { NextFunction, Request, Response } from "express";
import type { CreateToken } from "../../@types/interface/token";
import { authService } from "../../services/auth";

class AuthController {
  async postToken(request: Request, response: Response, next: NextFunction) {
    try {
      const query: CreateToken = request.query as any;

      const result = await authService.token(query);

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
