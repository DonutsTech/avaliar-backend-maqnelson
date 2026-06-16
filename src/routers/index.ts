import type { Router } from "express";
import type { IRouter } from "../@types/interface/router";
import AuthRouter from "./auth";
import FormRouter from "./form";
import GaleryRateRouter from "./galery";
import MarkWheelRouter from "./markWheel";
import UserRouter from "./user";
import VersionForminRouter from "./versionForm";

const applyRouters = (router: Router, routers: IRouter[]): void => {
  routers.forEach(route => route.create(router));
};

export const applyRoutersToApp = (router: Router): void => {
  const routers: IRouter[] = [
    UserRouter,
    AuthRouter,
    MarkWheelRouter,
    GaleryRateRouter,
    FormRouter,
    VersionForminRouter,
  ];
  applyRouters(router, routers);
}
