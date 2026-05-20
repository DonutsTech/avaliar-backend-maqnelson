import type { Router } from "express";
import { markWheelsController } from "../../controllers/markWheels";
import { isAuthenticate, schemaValidator } from "../../middleware";

class MarkWheelRouter {
  public static create(router: Router): void {
    router.get("/mark-wheel", isAuthenticate, markWheelsController.findAll);
    router.post("/mark-wheel", isAuthenticate, schemaValidator("markWheels/create"), markWheelsController.create);
  }
}

export default MarkWheelRouter;
