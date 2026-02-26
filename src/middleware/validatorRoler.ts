import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Role } from "../enums/role.enum";
import type { User } from "../generated/prisma/client";

export async function validatorRoler(request: Request, response: Response, next: NextFunction) {
  try {
    const { user } = request as Request & { user: User };

    if (user.ROLE !== Role.ADMIN) {
      return response.status(StatusCodes.FORBIDDEN).json({ message: 'Acesso negado' });
    }

    next();
  } catch (error) {
    next(error);
  }
}
