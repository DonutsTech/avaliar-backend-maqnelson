import type { Router } from "express";
import { versionCheckinController } from "../../controllers/versionCheckin";
import { isAuthenticate, validatorRole } from "../../middleware";

class VersionCheckinRouter {
  public static create(router: Router): void {
    router.get("/version-checkin", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), versionCheckinController.filterVersionCheckinStatusTrue);
  }
}

export default VersionCheckinRouter;
