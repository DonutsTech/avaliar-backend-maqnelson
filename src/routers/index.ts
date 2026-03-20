import { Router } from "express";
import { authController } from "../controllers/auth";
import { checkinController } from "../controllers/checkin";
import { markWheelsController } from "../controllers/markWheels";
import { userController } from "../controllers/user";
import { versionCheckinController } from "../controllers/versionCheckin";
import { isAuthenticate, schemaValidator, validatorRoler } from "../middleware";

const router = Router();

router.post("/users", isAuthenticate, validatorRoler, schemaValidator("user/create"), userController.createUser);
router.post("/checkins", isAuthenticate, validatorRoler, schemaValidator("checkin/create"), checkinController.createCheckin);
router.put("/checkins/:id", isAuthenticate, validatorRoler, schemaValidator("checkin/create"), checkinController.updateCheckin);
router.get("/users", isAuthenticate, userController.getUsers);
router.get("/auths", authController.getToken);
router.get("/version-checkin", isAuthenticate, versionCheckinController.filterVersionCheckinStatusTrue);
router.get("/mark-wheel", isAuthenticate, markWheelsController.findAll);
router.post("/mark-wheel", isAuthenticate, schemaValidator("markWheels/create"), markWheelsController.create);

export { router };
