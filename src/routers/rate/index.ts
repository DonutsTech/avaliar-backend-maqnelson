import type { Router } from "express";
import { rateController } from "../../controllers/rate";
import { isAuthenticate, schemaValidator } from "../../middleware";

class RateCheckinRouter {
  public static create(router: Router): void {
    router.post("/rate", isAuthenticate, schemaValidator("rate/create"), rateController.createRate);
    router.get("/rate", isAuthenticate, rateController.filterAll);
  }
}

export default RateCheckinRouter;
