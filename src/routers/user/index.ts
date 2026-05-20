import type { Router } from "express";
import { userController } from "../../controllers/user";
import { isAuthenticate, schemaValidator, validatorRoler } from "../../middleware";

class UserRouter {
  public static create(router: Router): void {
    router.post("/users", isAuthenticate, validatorRoler, schemaValidator("user/create"), userController.createUser);
    router.get("/users", isAuthenticate, validatorRoler, userController.getUsers);
  }
}

export default UserRouter;
