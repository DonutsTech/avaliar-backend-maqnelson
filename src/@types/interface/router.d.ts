import type { Router } from "express";

export interface IRouter {
  create(router: Router): void;
}
