import type { Router } from "express";
import { documentUpload, imageUpload, videoUpload } from "../../config/multerConfig";
import { galeryRateController } from "../../controllers/galeryRate";
import { isAuthenticate, schemaValidator, validatorRole } from "../../middleware";

class GaleryRateService {
  public async create(router: Router): Promise<void> {
    router.post("/galery/image", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), schemaValidator("galeryRate/create"), imageUpload.single('image') , galeryRateController.createGaleryRate);
    router.post("/galery/video", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), schemaValidator("galeryRate/create"), videoUpload.single('video') , galeryRateController.createGaleryRate);
    router.post("/galery/pdf", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), schemaValidator("galeryRate/create"), documentUpload.single('') , galeryRateController.createGaleryRate);
    router.get("/galery/:id", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), galeryRateController.getAllGaleryRate);
    router.delete("/galery/:id", isAuthenticate, validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']), galeryRateController.deleteGaleryRate);
  }
}
