import type { Router } from "express";
import type { IRouter } from "../@types/interface/router";
import AuthRouter from "./auth";
import CheckinRouter from "./checkin";
import MarkWheelRouter from "./markWheel";
import RateCheckinRouter from "./rateCheckin";
import UserRouter from "./user";

const applyRouters = (router: Router, routers: IRouter[]): void => {
  routers.forEach(route => route.create(router));
};

export const applyRoutersToApp = (router: Router): void => {
  const routers: IRouter[] = [
    UserRouter,
    AuthRouter,
    MarkWheelRouter,
    CheckinRouter,
    RateCheckinRouter,
  ];
  applyRouters(router, routers);
}
