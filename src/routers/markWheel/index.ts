import type { Router } from "express";
import { markWheelsController } from "../../controllers/markWheels";
import { isAuthenticate, schemaValidator, validatorRole } from "../../middleware";

class MarkWheelRouter {
  public static create(router: Router): void {
    router.get("/mark-wheel", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), markWheelsController.findAll);
    router.post("/mark-wheel", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), schemaValidator("markWheels/create"), markWheelsController.create);
    router.delete("/mark-wheel/:id", isAuthenticate, validatorRole(['ADMIN']), markWheelsController.delete);
  }
}

export default MarkWheelRouter;
