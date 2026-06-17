import type { NextFunction, Request, Response } from "express";
import { versionForminService } from "../../services/versionForm";

class VersionFormController {
  async filterVersionForminStatusTrue(_request: Request, response: Response, next: NextFunction) {
    try {
      const find = await versionForminService.filterVersionForminStatusTrue();
      return response.status(200).json(find);
    } catch (error) {
      next(error);
    }
  }
}

export const versionFormController = new VersionFormController();
