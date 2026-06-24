import type { Router } from 'express';
import { userController } from '../../controllers/user';
import { Role } from '../../enums/role.enum';
import {
  isAuthenticate,
  schemaValidator,
  validatorRole,
} from '../../middleware';

class UserRouter {
  public static create(router: Router): void {
    router.post(
      '/users',
      isAuthenticate,
      validatorRole([Role.adm]),
      schemaValidator('user/create'),
      userController.createUser,
    );
    router.get(
      '/users',
      isAuthenticate,
      validatorRole([Role.adm]),
      userController.getUsers,
    );
    router.get('/users/:email', isAuthenticate, userController.getUserByEmail);
  }
}

export default UserRouter;
