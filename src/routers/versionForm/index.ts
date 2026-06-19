import type { Router } from "express";
import { versionFormController } from "../../controllers/versionForm";
import { isAuthenticate, validatorRole } from "../../middleware";

class VersionForminRouter {
  public static create(router: Router): void {
    router.get("/version-form", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), versionFormController.filterVersionForminStatusTrue);
  }
}

export default VersionForminRouter;
