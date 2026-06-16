import type { Router } from "express";
import { formController } from "../../controllers/form";
import { isAuthenticate, schemaValidator, validatorRole } from "../../middleware";

class FormRouter {
  public static create(router: Router): void {
    router.post("/adm/form", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA']), schemaValidator("form/create"), formController.create);
    router.put("/adm/form/:id", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA']), schemaValidator("form/create"), formController.update);
    router.get("/adm/form", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA']), formController.getForm);
    router.get("/adm/form/:id", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA']), formController.getFormById);
    router.delete("/adm/form/:id", isAuthenticate, validatorRole(['ADMIN']), formController.delete);
  }
}

export default FormRouter;
