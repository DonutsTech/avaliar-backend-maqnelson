import type { Router } from 'express';
import { formController } from '../../controllers/form';
import { Role } from '../../enums/role.enum';
import {
  isAuthenticate,
  schemaValidator,
  validatorRole,
} from '../../middleware';

class FormRouter {
  public static create(router: Router): void {
    router.post(
      '/adm/form',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst]),
      schemaValidator('form/create'),
      formController.create,
    );
    router.put(
      '/adm/form/:id',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst]),
      schemaValidator('form/create'),
      formController.update,
    );
    router.get(
      '/adm/form',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst]),
      formController.getForm,
    );
    router.get(
      '/adm/form/:id',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst]),
      formController.getFormById,
    );
    router.delete(
      '/adm/form/:id',
      isAuthenticate,
      validatorRole([Role.adm]),
      formController.delete,
    );
  }
}

export default FormRouter;
