import { Router } from "express";
import { authController } from "../controllers/auth";
import { checkinController } from "../controllers/checkin";
import { userController } from "../controllers/user";
import { isAuthenticate, schemaValidator, validatorRoler } from "../middleware";

const router = Router();

router.post("/users", isAuthenticate, validatorRoler, schemaValidator("user/create"), userController.createUser);
router.post("/checkins", isAuthenticate, schemaValidator("checkin/create"), checkinController.createCheckin);
router.get("/users", isAuthenticate, userController.getUsers);
router.get("/auths", authController.getToken);

export { router };
