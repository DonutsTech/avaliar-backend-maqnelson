import { StatusCodes } from "http-status-codes";

export class CustomError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
