import type { NextFunction, Request, Response } from "express";

class GaleryController {
  async createGalery(request: Request, response: Response, next: NextFunction) {
    try {
      const body = request.body as string;
      const files = request.files as Express.Multer.File[] | undefined;
       const param: { cEmail: string } = request.query as any;

      const createGalery = await galeryService.createGalery(files, body, param.cEmail);

      return response.status(201).json(createGalery);
    } catch (error) {
      next(error);
    }
  }

  async getAllGalery(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as { id: string };
      const getAllGalery = await galeryService.getAllGalery(id);
      return response.status(200).json(getAllGalery);
    } catch (error) {
      next(error);
    }
  }

  async deleteGalery(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as { id: string };
      const deleteGalery = await galeryService.deleteGalery(id);
      return response.status(200).json(deleteGalery);
    } catch (error) {
      next(error);
    }
  }
}

export const galeryController = new GaleryController();
