import type { NextFunction, Request, Response } from "express";
import { galeryRateService } from "../../services/galeryRate";

class GaleryRateController {
  async createGaleryRate(request: Request, response: Response, next: NextFunction) {
    try {
      const body = request.body as CreateGalery;
      const file = request.file as Express.Multer.File;

      if (!file) {
        return response.status(400).json({ error: "File is required" });
      }

      const createGaleryRate = await galeryRateService.createGaleryRate(file, body);
      return response.status(201).json(createGaleryRate);

    } catch (error) {
      next(error);
    }
  }

  async getAllGaleryRate(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as { id: string };
      const getAllGaleryRate = await galeryRateService.getAllGaleryRate(id);
      return response.status(200).json(getAllGaleryRate);
    } catch (error) {
      next(error);
    }
  }

  async deleteGaleryRate(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as { id: string };
      const deleteGaleryRate = await galeryRateService.deleteGaleryRate(id);
      return response.status(200).json(deleteGaleryRate);
    } catch (error) {
      next(error);
    }
  }
}

export const galeryRateController = new GaleryRateController();
