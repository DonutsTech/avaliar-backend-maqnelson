import type { NextFunction, Request, Response } from "express";

class VersionFormController {
  async filterVersionForminStatusTrue(request: Request, response: Response, next: NextFunction) {
    try {
      const find = await versionFormService.filterVersionFormStatusTrue();
      return response.status(200).json(find);
    } catch (error) {
      next(error);
    }
  }
}

export const versionFormController = new VersionFormController();
