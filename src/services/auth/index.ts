import bycrpt from 'bcryptjs';
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import type { CreateToken } from '../../@types/interface/token';
import type { Payload } from '../../@types/payload';
import { CustomError } from "../../error";
import type { User } from "../../generated/prisma/client";
import { userModel } from "../../models/user";

class AuthService {
  createToken(user: User) {
    return jwt.sign(
      {
        sub: user.ID,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    )
  }

  checkingToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as Payload;
      return decoded;
    } catch (error) {
      throw new CustomError("Invalid token", StatusCodes.UNAUTHORIZED);
    }
  }

  async token(body: CreateToken): Promise<{ access_token: string }> {
    try {
      const user = await userModel.findBy({ where: { EMAIL: body.EMAIL } });

      if (!user) {
        throw new CustomError("User not found", StatusCodes.NOT_FOUND);
      }

      if (!(await bycrpt.compare(body.PASSWORD, user.PASSWORD))) {
        throw new CustomError("Invalid password", StatusCodes.UNAUTHORIZED);
      }

      const token = this.createToken(user);

      return { access_token: token };
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
