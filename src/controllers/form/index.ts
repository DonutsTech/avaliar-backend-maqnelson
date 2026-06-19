import type { NextFunction, Request, Response } from "express";
import type { CreateForm } from "../../@types/interface/form";
import { formService } from "../../services/form";

class FormController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const body: CreateForm = request.body;
      const create = await formService.createForm(body);
      return response.status(201).json(create);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as { id: string };
      const body: CreateForm = request.body;
      const update = await formService.update(id, body);
      return response.status(200).json(update);
    } catch (error) {
      next(error);
    }
  }

  async getForm(_request: Request, response: Response, next: NextFunction) {
    try {
      const resp = await formService.getAll();
      return response.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  }

  async getFormById(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as { id: string };
      const form = await formService.form(id);
      return response.status(200).json(form);
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as { id: string };
      const resp = await formService.deleteForm(id);
      return response.status(204).json(resp);
    } catch (error) {
      next(error);
    }
  }
}

export const formController = new FormController();
