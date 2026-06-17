import type { Router } from "express";
import { rateController } from "../../controllers/rate";
import { isAuthenticate, schemaValidator, validatorRole } from "../../middleware";

class RateRouter {
  public static create(router: Router): void {
    router.put("/adm/rate/:id", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA']), schemaValidator("rate/update"), rateController.updateRate);
    router.get("/adm/rate", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR']), rateController.filterAll);
    router.post("/app/rate", isAuthenticate, validatorRole(['USER', 'ADMIN', 'ANALISTA', 'DOCUMENTADOR']), schemaValidator("rate/create"), rateController.createRateForm);
    router.get("/app/rate", isAuthenticate, validatorRole(['USER', 'ADMIN', 'ANALISTA', 'DOCUMENTADOR']), rateController.filterRateForminEmailVend);
  }
}

export default RateRouter;
