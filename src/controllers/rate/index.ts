import type { NextFunction, Request, Response } from "express";
import type { CreateRateDto } from "../../@types/interface/createRate.dto";
import { rateService } from "../../services/rate";

class RateController {
  async createRateCheckin(request: Request, response: Response, next: NextFunction) {
    try {
      const body: CreateRateDto = request.body;
      const param: { email: string } = request.query as any;
      const create = await rateService.createRateCheckin(body, param.email);
      return response.status(201).json(create);
    } catch (error) {
      next(error);
    }
  }

  async filterRateCheckinEmailVend(request: Request, response: Response, next: NextFunction) {
    try {
      const param: { email: string } = request.query as any;
      const filter = await rateService.filterRateCheckinEmailVend(param.email);
      return response.status(200).json(filter);
    } catch (error) {
      next(error);
    }
  }
}

export const rateController = new RateController();
