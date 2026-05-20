import type { Router } from "express";
import { documentUpload, imageUpload, videoUpload } from "../../config/multerConfig";
import { galeryRateController } from "../../controllers/galeryRate";
import { isAuthenticate, schemaValidator } from "../../middleware";

class GaleryRateService {
  public async create(router: Router): Promise<void> {
      router.post("/galery/image", isAuthenticate, schemaValidator("galeryRate/create"), imageUpload.single('image') , galeryRateController.createGaleryRate);
      router.post("/galery/video", isAuthenticate, schemaValidator("galeryRate/create"), videoUpload.single('video') , galeryRateController.createGaleryRate);
      router.post("/galery/pdf", isAuthenticate, schemaValidator("galeryRate/create"), documentUpload.single('') , galeryRateController.createGaleryRate);
      router.get("/galery/:id", isAuthenticate, galeryRateController.getAllGaleryRate);
      router.delete("/galery/:id", isAuthenticate, galeryRateController.deleteGaleryRate);

  }
}
