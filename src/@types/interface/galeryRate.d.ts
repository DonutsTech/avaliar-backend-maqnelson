export type GaleryRatePrisma  = {
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
