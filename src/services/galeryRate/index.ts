import { prisma } from "../../prisma";

class GaleryRateService {
  async createGaleryRate(file: Express.Multer.File, body: CreateGalery) {
    try {
      const createGaleryRate = await prisma.galeryRate.create({
        data: {
          UUIDAPP: body.UUIDAPP,
          NAME: body.NAME,
          RATE_UUIDAPP: body.RATE_UUIDAPP,
          URL: file.path
        }
      })
      return createGaleryRate;
    } catch (error) {
      throw error;
    }
  }

  async getAllGaleryRate(uuid: string) {
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

  async deleteGaleryRate(uuid: string) {
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

export const galeryRateService = new GaleryRateService();
