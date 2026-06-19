import type { NextFunction, Request, Response } from "express";
import type { CreateMarkWheels } from "../../@types/interface/markWheels";
import { markWheelsService } from "../../services/markWheels";

class MarkWheelsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const body: CreateMarkWheels = request.body;
      const create = await markWheelsService.create(body);
      return response.status(201).json(create);
    } catch (error) {
      next(error);
    }
  }

  async findAll(_request: Request, response: Response, next: NextFunction) {
    try {
      const findAll = await markWheelsService.findAll();
      return response.status(200).json(findAll);
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as { id: string };
      await markWheelsService.delete(id);
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const markWheelsController = new MarkWheelsController();
