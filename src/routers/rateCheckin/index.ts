import type { Router } from "express";
import { rateController } from "../../controllers/rate";
import { isAuthenticate, schemaValidator, validatorRole } from "../../middleware";

class RateCheckinRouter {
  public static create(router: Router): void {
    router.post("/rate-checkin", isAuthenticate, validatorRole(['USER']), schemaValidator("rateCheckin/create"), rateController.createRateCheckin);
    router.get("/rate-checkin", isAuthenticate, validatorRole(['USER']), rateController.filterRateCheckinEmailVend);
  }
}

export default RateCheckinRouter;
