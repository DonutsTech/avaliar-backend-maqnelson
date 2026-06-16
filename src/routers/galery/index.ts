import type { Router } from "express";
import { documentUpload, imageUpload, videoUpload } from "../../config/multerConfig";
import { galeryController } from "../../controllers/galery";
import { isAuthenticate, schemaValidator, validatorRole } from "../../middleware";

class GaleryRouter {
  public static create(router: Router): void {
    router.post("/galery/image", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), imageUpload.array('photos') , galeryController.createGalery);
    router.post("/galery/video", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), schemaValidator("galery/create"), videoUpload.single('video') , galeryController.createGalery);
    router.post("/galery/pdf", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), schemaValidator("galery/create"), documentUpload.single('') , galeryController.createGalery);
    router.get("/galery/:id", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), galeryController.getAllGalery);
    router.delete("/galery/:id", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), galeryController.deleteGalery);
  }
}


export default GaleryRouter;
