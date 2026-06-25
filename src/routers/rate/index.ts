import type { Router } from 'express';
import { rateController } from '../../controllers/rate';
import { Role } from '../../enums/role.enum';
import {
  isAuthenticate,
  schemaValidator,
  validatorRole,
} from '../../middleware';

class RateRouter {
  public static create(router: Router): void {
    router.put(
      '/adm/rate/:id',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst, Role.finance]),
      schemaValidator('rate/update'),
      rateController.updateRate,
    );
    router.get(
      '/adm/rate',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst, Role.finance]),
      rateController.filterAll,
    );
    router.get(
      '/web/rate',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst, Role.finance, Role.user]),
      rateController.getRateForWeb,
    );
    router.post(
      '/app/rate',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst, Role.finance, Role.user]),
      schemaValidator('rate/create'),
      rateController.createRateForm,
    );
    router.get(
      '/app/rate',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst, Role.finance, Role.user]),
      rateController.filterRateForminEmailVend,
    );
  }
}

export default RateRouter;
