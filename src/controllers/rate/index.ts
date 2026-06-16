import type { NextFunction, Request, Response } from "express";
import type { CreateRateForm } from "../../@types/interface/rate";
import { rateService } from "../../services/rate";

class RateController {
  async createRateForm(request: Request, response: Response, next: NextFunction) {
    try {
      const body: { rate: CreateRateForm[] } = request.body;
      const create = await rateService.createRateCheckin(body);
      return response.status(201).json(create);
    } catch (error) {
      next(error);
    }
  }

  async filterRateForminEmailVend(request: Request, response: Response, next: NextFunction) {
    try {
      const param: { cEmail: string } = request.query as any;
      const filter = await rateService.filterRateFormEmailVend(param.cEmail);
      return response.status(200).json(filter);
    } catch (error) {
      next(error);
    }
  }

  async updateRate(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const data = request.body;
      const update = await rateService.updateRate(Number(id), data);
      return response.status(200).json(update);
    } catch (error) {
      next(error);
    }
  }

  async filterAll(request: Request, response: Response, next: NextFunction) {
    try {
      const rates = await rateService.filterAll();
      return response.status(200).json(rates);
    } catch (error) {
      next(error);
    }
  }
}

export const rateController = new RateController();
