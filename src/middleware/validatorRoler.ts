import type { NextFunction, Request, Response } from "express";
import type { User } from "../generated/prisma/client";
import { CustomError } from "../error";
import { StatusCodes } from "http-status-codes";

export async function validatorRoler(request: Request, _response: Response, next: NextFunction): Promise<void> {
  try {
    const { user } = request as Request & { user: User };

    if (user.ROLE !== 'ADMIN') {
      throw new CustomError('Acesso negado', StatusCodes.FORBIDDEN);
    }

    next();
  } catch (error) {
    next(error);
  }
}
