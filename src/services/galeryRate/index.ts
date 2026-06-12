import { CustomError } from "../../error";
import { prisma } from "../../prisma";

class GaleryRateService {
  async createGaleryRate(files: Express.Multer.File[] | undefined, body: CreateGalery[]) {
    try {
      if ((files && files.length === 0) || !files) {
        throw new CustomError("Arquivo faltande", 400);
      }

      for (const item of body) {
        const fileUpload: Express.Multer.File | undefined = files.find(f => f.originalname.startsWith(item.UUIDAPP));

        console.log(fileUpload);
      }
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
