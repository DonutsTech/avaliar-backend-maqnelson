import type { Router } from 'express';
import {
  documentUpload,
  imageUpload,
  videoUpload,
} from '../../config/multerConfig';
import { galeryController } from '../../controllers/galery';
import { Role } from '../../enums/role.enum';
import { isAuthenticate, validatorRole } from '../../middleware';

class GaleryRouter {
  public static create(router: Router): void {
    router.post(
      '/galery/image',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst, Role.finance, Role.user]),
      imageUpload.array('photos'),
      galeryController.createGaleryPhoto,
    );
    router.post(
      '/galery/video',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst, Role.finance, Role.user]),
      videoUpload.array('videos'),
      galeryController.createGaleryVideo,
    );
    router.post(
      '/galery/pdf',
      isAuthenticate,
      validatorRole(['ADMIN', 'ANALISTA', 'DOCUMENTADOR', 'USER']),
      documentUpload.single('pdf'),
      galeryController.createGaleryPdf,
    );
    router.get(
      '/galery/:id',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst, Role.finance, Role.user]),
      galeryController.getAllGalery,
    );
    router.delete(
      '/galery/:id',
      isAuthenticate,
      validatorRole([Role.adm, Role.analyst]),
      galeryController.deleteGalery,
    );
  }
}

export default GaleryRouter;
