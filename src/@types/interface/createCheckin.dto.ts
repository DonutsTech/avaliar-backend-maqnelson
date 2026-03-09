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
        BOND: boolean;
        MIN: number | undefined;
        MAX: number | undefined;
        BONDTYPE: string;
        EMUNS: {
          TITLE: string;
          NAME: string;
        }[];
      }[];
    }[];
  }[];
}
