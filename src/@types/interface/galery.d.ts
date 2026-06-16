export interface CreateGalery {
  UUIDAPP: string;
  NAME: string;
  URL: string;
  RATE: {
    ID: number;
  };
  RATE_UUIDAPP: string;
}

export type GaleryPrisma  = {
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
