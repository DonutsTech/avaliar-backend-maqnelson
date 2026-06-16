export interface CreateForm {
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

export type FormSelectInclude = {
   SCHEMAS: {
    select: {
      ID: true,
      TITLE: true,
      IDCHECKIN: true,
      MODELS: {
        select: {
          ID: true,
          NAME: true,
          TITLE: true,
          QUESTION: true,
          IDSCHEMA: true,
          INPUTS: {
            select: {
              ID: true,
              TYPE: true,
              NAME: true,
              LABEL: true,
              VALUE: true,
              PLACEHOLDER: true,
              REQUIRED: true,
              MULTIPLE: true,
              MIN: true,
              MAX: true,
              BONDTYPE: true,
              IDMODEL: true,
              EMUNS: {
                select: {
                  ID: true,
                  NAME: true,
                  TITLE: true,
                  IDINPUT: true,
                }
              }
            }
          }
        }
      }
    }
  }
}
