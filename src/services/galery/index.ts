import { join } from "path";
import type { CreateGalery, GaleryPrisma } from "../../@types/interface/galery";
import { uploadFile } from "../../config/file";
import { CustomError } from "../../error";
import { galeryModel } from "../../models/galery";
import { prisma } from "../../prisma";
import { rateService } from "../rate";

const selectGalery: GaleryPrisma  = {
  UUIDAPP: true,
  NAME: true,
  URL: true,
  RATE_UUIDAPP: true,
  RATE: {
    select: {
      ID: true,
    }
  }
}

class GaleryService {
  async existGaleryRateForUuid(uuid: string): Promise<CreateGalery | null> {
    const galeryRate = await galeryModel.findBy<GaleryPrisma>({
      where: { UUIDAPP: uuid },
      select: selectGalery,
    });

    return galeryRate;
  }

  async createGaleryForRate(files: Express.Multer.File[] | undefined, body: string, email: string): Promise<{
    success: boolean;
    message: string;
    data: CreateGalery[] | [];
  }> {
    try {
      if ((files && files.length === 0) || !files) {
        return {
          success: false,
          message: "Nenhum arquivo enviado",
          data: [],
        };
      }

      const galery = JSON.parse((body as any).metadata) as CreateGalery[];

      if (!galery || galery.length === 0 || files.length !== galery.length) {
        return {
          success: false,
          message: "Dados de galeria ou arquivos estão faltando ou não correspondem",
          data: [],
        };
      }

      const gallery = [];

      for (const item of galery) {
        const existingGaleryRate = await this.existGaleryRateForUuid(item.UUIDAPP);

        if (existingGaleryRate) {
          gallery.push(existingGaleryRate);
          continue;
        }

        const fileUpload: Express.Multer.File | undefined = files.find(f => f.originalname.split('_')[0] === item.UUIDAPP);

        if (!fileUpload) {
          throw new CustomError(`Arquivo para UUIDAPP ${item.UUIDAPP} não encontrado`, 400);
        }

        const path =  join(__dirname, '..', '..', '..', 'uploads', 'photo', fileUpload.originalname);

        await uploadFile(fileUpload, path);

        const existingRate = await rateService.existRateForUuid(item.RATE_UUIDAPP);

        if (!existingRate) {
          const galleryRate = await prisma.galeryRate.create({
            data: {
              UUIDAPP: item.UUIDAPP,
              NAME: item.NAME,
              URL: `${process.env.BANCKEND_URL}/uploads/photo/${fileUpload.originalname}`,
              RATE: { create: { UUIDAPP: item.RATE_UUIDAPP, EMAILVEND: email } },
            },
            select: selectGalery
          });

          gallery.push(galleryRate);

          continue;
        }

        if (existingRate) {
          const galleryRate = await prisma.galeryRate.create({
            data: {
              UUIDAPP: item.UUIDAPP,
              NAME: item.NAME,
              URL: path,
              RATE: { connect: { UUIDAPP: item.RATE_UUIDAPP, EMAILVEND: email } },
            },
            select: selectGalery
          });

          gallery.push(galleryRate);

          continue;
        }
      }

      return {
        success: true,
        message: "Galeria criada com sucesso",
        data: gallery
      };
    } catch (error) {
      return {
        success: false,
        message: "Erro ao criar galeria: " + (error instanceof Error ? error.message : String(error)),
        data: [],
      };
    }
  }

  async getAllGaleryForRate(uuid: string) {
    try {
      const findMany = await prisma.galeryRate.findMany({
        where: {
          RATE_UUIDAPP: uuid
        }
      })

      return findMany;
    } catch (error) {
      throw error;
    }
  }

  async deleteGalery(uuid: string) {
    try {
      const deleteGaleryRate = await prisma.galeryRate.delete({
        where: {
          UUIDAPP: uuid
        }
      })

      return deleteGaleryRate;
    } catch (error) {
      throw error;
    }
  }
}

export const galeryService = new GaleryService();
