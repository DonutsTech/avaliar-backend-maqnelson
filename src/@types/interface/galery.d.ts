export interface CreateGalery {
  UUIDAPP: string;
  NAME: string;
  URL: string;
  RATE: {
    ID: number;
  };
  RATE_UUIDAPP: string;
}

export interface CreateGaleryForWeb {
  ID_RATE: number;
  NAME: string;
  URL: string;
}

export type GaleryPrisma = {
  UUIDAPP: true;
  NAME: true;
  URL: true;
  RATE_UUIDAPP: true;
  RATE: {
    select: {
      ID: true;
    };
  };
};
