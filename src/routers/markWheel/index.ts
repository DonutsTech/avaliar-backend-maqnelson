import type { Router } from 'express';
import { markWheelsController } from '../../controllers/markWheels';
import { Role } from '../../enums/role.enum';
import {
  isAuthenticate,
  schemaValidator,
  validatorRole,
} from '../../middleware';

class MarkWheelRouter {
  public static create(router: Router): void {
    router.get(
      '/mark-wheel',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst, Role.finance, Role.user]),
      markWheelsController.findAll,
    );
    router.post(
      '/mark-wheel',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst, Role.finance, Role.user]),
      schemaValidator('markWheels/create'),
      markWheelsController.create,
    );
    router.delete(
      '/adm/mark-wheel/:id',
      isAuthenticate,
      validatorRole([Role.adm]),
      markWheelsController.delete,
    );
  }
}

export default MarkWheelRouter;
