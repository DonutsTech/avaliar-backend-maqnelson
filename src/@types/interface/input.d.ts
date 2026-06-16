export interface CreateInput {
  TYPE: string;
  NAME: string;
  LABEL: string;
  VALUE: string;
  PLACEHOLDER: string;
  REQUIRED: boolean;
  MULTIPLE: boolean;
  MIN: number | null;
  MAX: number | null;
  BONDTYPE: string;
  MODELID: string;
}
