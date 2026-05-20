import type { Router } from "express";
import { isAuthenticate, schemaValidator } from "../../middleware";
import { rateController } from "../../controllers/rate";

class RateCheckinRouter {
  public static create(router: Router): void {
    router.post("/rate-checkin", isAuthenticate, schemaValidator("rate/create"), rateController.createRateCheckin);
    router.get("/rate-checkin", isAuthenticate, rateController.filterRateCheckinEmailVend);
  }
}

export default RateCheckinRouter;
