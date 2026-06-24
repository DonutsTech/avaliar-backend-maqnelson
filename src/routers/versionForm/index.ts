import type { Router } from 'express';
import { versionFormController } from '../../controllers/versionForm';
import { Role } from '../../enums/role.enum';
import { isAuthenticate, validatorRole } from '../../middleware';

class VersionForminRouter {
  public static create(router: Router): void {
    router.get(
      '/version-form',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst, Role.finance, Role.user]),
      versionFormController.filterVersionForminStatusTrue,
    );
  }
}

export default VersionForminRouter;
