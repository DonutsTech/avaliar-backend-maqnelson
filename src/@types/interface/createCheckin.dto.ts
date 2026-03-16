export interface CreateCheckinDto {
  NAME: string;
  SCHEMAS: {
    TITLE: string;
    MODELS: {
      NAME: string;
      TITLE: string;
      QUESTION: string;
      INPUTS: {
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
        EMUNS: {
          TITLE: string;
          NAME: string;
        }[];
      }[];
    }[];
  }[];
}
