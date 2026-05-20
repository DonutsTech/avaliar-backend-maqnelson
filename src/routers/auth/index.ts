import type { Router } from "express";
import { authController } from "../../controllers/auth";

class AuthRouter {
  public static create(router: Router): void {
    router.post("/auths", authController.postToken);
  }
}

export default AuthRouter;
