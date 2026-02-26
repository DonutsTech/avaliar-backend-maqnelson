import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { authService } from "../services/auth";
import { userService } from "../services/user";

export async function isAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token não fornecido' });
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      return response.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token não fornecido' });
    }

    const checkToken = authService.checkingToken(token);

    const user = await userService.showId(checkToken.sub);

    if (!user) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: 'Usuário não encontrado' });
    }

    request.user = user;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}
