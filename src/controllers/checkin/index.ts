import type { NextFunction, Request, Response } from "express";
import type { CreateCheckinDto } from "../../@types/interface/createCheckin.dto";
import { checkinService } from "../../services/checkin";

class CheckinController {
  async createCheckin(request: Request, response: Response, next: NextFunction) {
    try {
      const body: CreateCheckinDto = request.body;
      const create = await checkinService.createCheckin(body);
      return response.status(201).json(create);
    } catch (error) {
      next(error);
    }
  }

  async updateCheckin(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as { id: string };
      const body: CreateCheckinDto = request.body;
      const update = await checkinService.updateCheckin(id, body);
      return response.status(200).json(update);
    } catch (error) {
      next(error);
    }
  }

  async getCheckins(request: Request, response: Response, next: NextFunction) {
    try {
      const checkins = await checkinService.checkinsAll();
      return response.status(200).json(checkins);
    } catch (error) {
      next(error);
    }
  }

  async getCheckinById(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as { id: string };
      const checkin = await checkinService.checkin(id);
      return response.status(200).json(checkin);
    } catch (error) {
      next(error);
    }
  }
}

export const checkinController = new CheckinController();
