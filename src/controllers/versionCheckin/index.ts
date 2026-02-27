import type { NextFunction, Request, Response } from "express";

class VersionCheckinController {
  async filterVersionCheckinStatusTrue(request: Request, response: Response, next: NextFunction) {
    try {

    } catch (error) {
      next(error);
    }
  }
}

export const versionCheckinController = new VersionCheckinController();
