import type { Router } from "express";
import { checkinController } from "../../controllers/checkin";
import { isAuthenticate, schemaValidator, validatorRole } from "../../middleware";

class CheckinRouter {
  public static create(router: Router): void {
    router.post("/checkins", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA']), schemaValidator("checkin/create"), checkinController.createCheckin);
    router.put("/checkins/:id", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA']), schemaValidator("checkin/create"), checkinController.updateCheckin);
    router.get("/checkins", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA']), checkinController.getCheckins);
    router.get("/checkins/:id", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA']), checkinController.getCheckinById);
    router.delete("/checkins/:id", isAuthenticate, validatorRole(['ADMIN']), checkinController.deleteCheckin);
  }
}

export default CheckinRouter;
