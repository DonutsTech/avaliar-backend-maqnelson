import type { NextFunction, Request, Response } from "express";
import type { CreateTokenDto } from "../../@types/interface/createToken.dto";
import { authService } from "../../services/auth";

class AuthController {
  async getToken(request: Request, response: Response, next: NextFunction) {
    try {
      const query: CreateTokenDto = request.query as any;

      const result = await authService.token(query);

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
