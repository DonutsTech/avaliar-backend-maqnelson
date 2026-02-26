import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../error";
import { authService } from "../services/auth";
import { userService } from "../services/user";

export async function isAuthenticate(
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new CustomError('Token não fornecido', StatusCodes.UNAUTHORIZED);
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      throw new CustomError('Token não fornecido', StatusCodes.UNAUTHORIZED);
    }

    const checkToken = authService.checkingToken(token);

    const user = await userService.showId(checkToken.sub);

    if (!user) {
      throw new CustomError('Usuário não encontrado', 404);
    }

    request.user = user;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}
