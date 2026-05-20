import type { Router } from "express";
import { rateController } from "../../controllers/rate";
import { isAuthenticate, schemaValidator } from "../../middleware";

class RateCheckinRouter {
  public static create(router: Router): void {
    router.put("/rate/:id", isAuthenticate, schemaValidator("rate/update"), rateController.updateRate);
    router.get("/rate", isAuthenticate, rateController.filterAll);
  }
}

export default RateCheckinRouter;
