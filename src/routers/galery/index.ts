import type { Router } from "express";
import { imageUpload, videoUpload } from "../../config/multerConfig";
import { galeryController } from "../../controllers/galery";
import { isAuthenticate, validatorRole } from "../../middleware";

class GaleryRouter {
  public static create(router: Router): void {
    router.post("/galery/image", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), imageUpload.array('photos') , galeryController.createGaleryPhoto);
    router.post("/galery/video", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), videoUpload.array('videos') , galeryController.createGaleryVideo);
    //router.post("/galery/pdf", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), schemaValidator("galery/create"), documentUpload.single('') , galeryController.createGalery);
    router.get("/galery/:id", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), galeryController.getAllGalery);
    router.delete("/galery/:id", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), galeryController.deleteGalery);
  }
}


export default GaleryRouter;
