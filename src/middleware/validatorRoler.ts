import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { User } from "../generated/prisma/client";

export function validatorRole(allowedRoles: string[]) {
  return function (request: Request, response: Response, next: NextFunction) {
    const { user } = request as Request & { user: User };

    if (!allowedRoles.includes(user.ROLE)) {
      return response.status(StatusCodes.FORBIDDEN).json({ message: "Acesso negado" });
    }

    next();
  };
}
