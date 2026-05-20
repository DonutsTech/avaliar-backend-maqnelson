
export interface CreateRateCheckinDto {
  UUIDAPP: string;
  IDVERSIONCHECKIN: string;
  CODVEND: string;
  FILIAL: string;
  NAMEVEND: string;
  EMAILVEND: string;
  RESULT: string;
  TYPE: string;
  MARK: string;
  MODEL: string;
  CHASSI: string;
  VALUE: string;
  DATE: string;
  CODCLI: string;
  LJCLI: string;
  CODPROS: string;
  LJPROS: string;
  NAMECLI: string;
  ADDRESSCLI: string;
  PHONECLI: string;
  EMAILCLI: string;
  MESSAGE: string;
  STATUS: string;
}

export interface CreateRateDto {
  UUIDAPP: string;
  IDVERSIONCHECKIN: string;
  RESULT: string;
  STATUS: string;
  MESSAGE?: string;
  TYPE: string;
  MARK: string;
  MODEL: string;
  CHASSI: string;
  VALUE: string;
  CODVEND: string;
  FILIAL: string;
  NAMEVEND: string;
  EMAILVEND: string;
  CODCLI: string;
  LJCLI: string;
  CODPROS: string;
  LJPROS: string;
  NAMECLI: string;
  ADDRESSCLI: string;
  PHONECLI: string;
  EMAILCLI: string;
  DATE: string;
  VALUE1YEAR?: string;
  VALUE2YEAR?: string;
  VALUE3YEAR?: string;
  VALUE4YEAR?: string;
  TAXA?: string;
  VALUEVIEW?: string;
  VALUERATE?: string;
  VALIDITY?: string;
  VALUESUG?: string;
  FILIAL_WEB?: string;
  CANAL?: string;
  RESSED?: boolean;
  MODALITY?: string;
  VALUEBY?: string;
  VALUENEG?: string;
  STOKE?: boolean;
  REASON?: boolean;
  OBSREASON?: string;
  INDICATOR?: boolean;
  WHO?: string;
  OBSALL?: string;
}

export type UpdateRateDto = Partial<CreateRateDto>;
