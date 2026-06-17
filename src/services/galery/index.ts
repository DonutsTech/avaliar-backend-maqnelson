import { join } from "path";
import type { CreateGalery, GaleryPrisma } from "../../@types/interface/galery";
import { deleteFile, uploadFile } from "../../config/file";
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

  async createFileGaleryForRate(file: Express.Multer.File, type: 'photo' | 'video' | 'document'): Promise<string> {
    try {
      const path =  join(__dirname, '..', '..', '..', 'uploads', type, file.originalname);

      await uploadFile(file, path);

      return `${process.env.BANCKEND_URL}/uploads/${type}/${file.originalname}`;
    } catch (error) {
      throw error;
    }
  }

  async deleteFileGaleryForRate(url: string, type: 'photo' | 'video' | 'document') {
    try {
      const arrayPath = url.split('/')
      const fileName = arrayPath[arrayPath.length - 1];

      if (!fileName) {
        throw new CustomError("Nome do arquivo não encontrado no caminho fornecido", 400);
      }

      const path =  join(__dirname, '..', '..', 'uploads', type, fileName);
      await deleteFile(path);
    } catch (error) {
      throw error;
    }
  }

  async createGaleryForRate(files: Express.Multer.File[] | undefined, body: string, email: string, type: 'photo' | 'video'): Promise<{
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

        if (existingGaleryRate && existingGaleryRate.URL === item.URL) {
          gallery.push(existingGaleryRate);
          continue;
        }

        const fileUpload: Express.Multer.File | undefined = files.find(f => f.originalname.split('_')[0] === item.UUIDAPP);

        if (existingGaleryRate && fileUpload && existingGaleryRate.URL !== item.URL) {
          await this.deleteFileGaleryForRate(existingGaleryRate.URL, type);
          const file =  await this.createFileGaleryForRate(fileUpload, type);

          const updateGaleryRate = await prisma.galeryRate.update({
            where: {
              UUIDAPP: item.UUIDAPP
            },
            data: {
              NAME: item.NAME,
              URL: file,
            },
            select: selectGalery
          });

          gallery.push(updateGaleryRate);
          continue;
        }

        if (!fileUpload) {
          throw new CustomError(`Arquivo para UUIDAPP ${item.UUIDAPP} não encontrado`, 400);
        }

        const file =  await this.createFileGaleryForRate(fileUpload, type);

        const existingRate = await rateService.existRateForUuid(item.RATE_UUIDAPP);

        if (!existingRate) {
          const galleryRate = await prisma.galeryRate.create({
            data: {
              UUIDAPP: item.UUIDAPP,
              NAME: item.NAME,
              URL: file,
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
              URL: file,
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
