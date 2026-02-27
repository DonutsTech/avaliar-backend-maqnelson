export interface CreateInputDto {
  TYPE: string;
  NAME: string;
  LABEL: string;
  PLACEHOLDER: string;
  REQUIRED: boolean;
  MULTIPLE: boolean;
  BOND: boolean;
  MIN?: number | undefined;
  MAX?: number | undefined;
  BONDTYPE: string;
  MODELID: string;
}
