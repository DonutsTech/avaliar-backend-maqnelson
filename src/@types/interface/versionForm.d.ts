export type VersionForminSelectInclude = {
  ID: true,
  NAME: true,
  VERSION: true,
  IDCHECKIN: true,
  PHOTO: true,
  VIDEO: true,
  ATIVE: true,
  JSON_CHECKIN: true,
  OBJECT_CHECKIN: true,
  CREATEDAT: false,
  UPDATEDAT: false,
}

export interface CreateVersionForm {
  IDCHECKIN: string;
  VERSION: number;
  JSON_CHECKIN: string;
  OBJECT_CHECKIN: string;
  ATIVE: boolean;
  NAME: string;
  PHOTO: boolean;
  VIDEO: boolean;
}
