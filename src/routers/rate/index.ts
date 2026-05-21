import type { Router } from "express";
import { rateController } from "../../controllers/rate";
import { isAuthenticate, schemaValidator, validatorRole } from "../../middleware";

class RateCheckinRouter {
  public static create(router: Router): void {
    router.put("/rate/:id", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA']), schemaValidator("rate/update"), rateController.updateRate);
    router.get("/rate", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR']), rateController.filterAll);
  }
}

export default RateCheckinRouter;
