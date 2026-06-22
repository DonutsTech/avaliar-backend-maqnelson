import { StatusCodes } from 'http-status-codes';
import type { CreateGalery, GaleryPrisma } from '../../@types/interface/galery';
import { deleteFileFromS3, uploadFileToS3 } from '../../config/S3';
import { CustomError } from '../../error';
import { galeryModel } from '../../models/galery';
import { prisma } from '../../prisma';
import { rateService } from '../rate';

const selectGalery: GaleryPrisma = {
  UUIDAPP: true,
  NAME: true,
  URL: true,
  RATE_UUIDAPP: true,
  RATE: {
    select: {
      ID: true,
    },
  },
};

class GaleryService {
  async existGaleryRateForUuid(uuid: string): Promise<CreateGalery | null> {
    const galeryRate = await galeryModel.findBy<GaleryPrisma>({
      where: { UUIDAPP: uuid },
      select: selectGalery,
    });

    return galeryRate;
  }

  async createGalery(file: Express.Multer.File): Promise<string> {
    try {
      const uploadResult = await uploadFileToS3(file);

      if (uploadResult === '') {
        throw new CustomError(
          'Erro ao fazer upload do vídeo',
          StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }

      return uploadResult;
    } catch (error) {
      throw error;
    }
  }

  async createGaleryForRate(
    files: Express.Multer.File[] | undefined,
    body: string,
    email: string,
  ): Promise<{
    success: boolean;
    message: string;
    data: CreateGalery[] | [];
  }> {
    try {
      if ((files && files.length === 0) || !files) {
        return {
          success: false,
          message: 'Nenhum arquivo enviado',
          data: [],
        };
      }

      const galery = JSON.parse((body as any).metadata) as CreateGalery[];

      if (!galery || galery.length === 0 || files.length !== galery.length) {
        return {
          success: false,
          message:
            'Dados de galeria ou arquivos estão faltando ou não correspondem',
          data: [],
        };
      }

      const gallery = [];

      for (const item of galery) {
        const existingGaleryRate = await this.existGaleryRateForUuid(
          item.UUIDAPP,
        );

        if (existingGaleryRate && existingGaleryRate.URL === item.URL) {
          gallery.push(existingGaleryRate);
          continue;
        }

        const fileUpload: Express.Multer.File | undefined = files.find(
          f => f.originalname.split('_')[0] === item.UUIDAPP,
        );

        if (!fileUpload) {
          throw new CustomError(
            `Arquivo para UUIDAPP ${item.UUIDAPP} não encontrado`,
            400,
          );
        }

        const file = await this.createGalery(fileUpload);
        console.log('File uploaded to S3:', file);

        if (
          existingGaleryRate &&
          fileUpload &&
          existingGaleryRate.URL !== item.URL
        ) {
          await deleteFileFromS3(existingGaleryRate.URL);

          const updateGaleryRate = await prisma.galeryRate.update({
            where: {
              UUIDAPP: item.UUIDAPP,
            },
            data: {
              NAME: item.NAME,
              URL: file,
            },
            select: selectGalery,
          });

          gallery.push(updateGaleryRate);
          continue;
        }

        const existingRate = await rateService.existRateForUuid(
          item.RATE_UUIDAPP,
        );

        if (!existingRate) {
          const galleryRate = await prisma.galeryRate.create({
            data: {
              UUIDAPP: item.UUIDAPP,
              NAME: item.NAME,
              URL: file,
              RATE: {
                create: { UUIDAPP: item.RATE_UUIDAPP, EMAILVEND: email },
              },
            },
            select: selectGalery,
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
              RATE: {
                connect: { UUIDAPP: item.RATE_UUIDAPP, EMAILVEND: email },
              },
            },
            select: selectGalery,
          });

          gallery.push(galleryRate);

          continue;
        }
      }

      return {
        success: true,
        message: 'Galeria criada com sucesso',
        data: gallery,
      };
    } catch (error) {
      return {
        success: false,
        message:
          'Erro ao criar galeria: ' +
          (error instanceof Error ? error.message : String(error)),
        data: [],
      };
    }
  }

  async getAllGaleryForRate(uuid: string) {
    try {
      const findMany = await prisma.galeryRate.findMany({
        where: {
          RATE_UUIDAPP: uuid,
        },
      });

      return findMany;
    } catch (error) {
      throw error;
    }
  }

  async deleteGalery(uuid: string) {
    try {
      const deleteGaleryRate = await prisma.galeryRate.delete({
        where: {
          UUIDAPP: uuid,
        },
      });

      return deleteGaleryRate;
    } catch (error) {
      throw error;
    }
  }
}

export const galeryService = new GaleryService();
