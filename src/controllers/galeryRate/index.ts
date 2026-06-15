import type { NextFunction, Request, Response } from "express";
import { galeryRateService } from "../../services/galeryRate";

class GaleryRateController {
  async createGaleryRate(request: Request, response: Response, next: NextFunction) {
    try {
      console.log("Request received for creating galery rate");
      const body = request.body as string;
      const files = request.files as Express.Multer.File[] | undefined;
       const param: { cEmail: string } = request.query as any;

      const createGaleryRate = await galeryRateService.createGaleryRate(files, body, param.cEmail);

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
