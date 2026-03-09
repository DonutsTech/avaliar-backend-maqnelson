import type { NextFunction, Request, Response } from "express";
import { versionCheckinService } from "../../services/versionCheckin";

class VersionCheckinController {
  async filterVersionCheckinStatusTrue(request: Request, response: Response, next: NextFunction) {
    try {
      const find = await versionCheckinService.filterVersionCheckinStatusTrue();
      return response.status(200).json(find);
    } catch (error) {
      next(error);
    }
  }
}

export const versionCheckinController = new VersionCheckinController();
