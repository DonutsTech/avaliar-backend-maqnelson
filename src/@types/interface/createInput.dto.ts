export interface CreateInputDto {
  TYPE: string;
  NAME: string;
  LABEL: string;
  VALUE: string;
  PLACEHOLDER: string;
  REQUIRED: boolean;
  MULTIPLE: boolean;
  MIN: number | undefined;
  MAX: number | undefined;
  BONDTYPE: string;
  MODELID: string;
}
