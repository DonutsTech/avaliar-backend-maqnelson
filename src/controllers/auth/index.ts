import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../../@types/express";
import type { CreateTokenDto } from "../../@types/interface/createToken.dto";
import { authService } from "../../services/auth";

class AuthController {
  async token(request: CustomRequest<CreateTokenDto>, response: Response, next: NextFunction) {
    try {
      const { EMAIL, PASSWORD } = request.query;

      const result = await authService.token({ EMAIL, PASSWORD });

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
