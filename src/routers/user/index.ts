import type { Router } from "express";
import { userController } from "../../controllers/user";
import { isAuthenticate, schemaValidator, validatorRole } from "../../middleware";

class UserRouter {
  public static create(router: Router): void {
    router.post("/users", isAuthenticate, validatorRole(['ADMIN']), schemaValidator("user/create"), userController.createUser);
    router.get("/users", isAuthenticate, validatorRole(['ADMIN']), userController.getUsers);
    router.get("/users/:email", isAuthenticate, userController.getUserByEmail);
  }
}

export default UserRouter;
