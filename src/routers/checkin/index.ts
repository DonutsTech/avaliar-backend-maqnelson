import type { Router } from "express";
import { checkinController } from "../../controllers/checkin";
import { isAuthenticate, schemaValidator, validatorRoler } from "../../middleware";

class CheckinRouter {
  public static create(router: Router): void {
    router.post("/checkins", isAuthenticate, validatorRoler, schemaValidator("checkin/create"), checkinController.createCheckin);
    router.put("/checkins/:id", isAuthenticate, validatorRoler, schemaValidator("checkin/create"), checkinController.updateCheckin);
    router.get("/checkins", isAuthenticate, validatorRoler, checkinController.getCheckins);
    router.get("/checkins/:id", isAuthenticate, validatorRoler, checkinController.getCheckinById);
  }
}

export default CheckinRouter;
