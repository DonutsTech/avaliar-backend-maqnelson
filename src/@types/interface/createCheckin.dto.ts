export interface CreateCheckinDto {
  NAME: string;
  SCHEMAS: {
    TITLE: string;
    MODELS: {
      NAME: string;
      TITLE: string;
      QUESTION: string;
      ICONS: boolean;
      PHOTO: boolean;
      BONDPHOTO: boolean;
      LOCATION: boolean;
      INPUTS: {
        TYPE: "text" | "select" | "radio" | "checkout" | "file";
        NAME: string;
        LABEL: string;
        PLACEHOLDER: string;
        REQUIRED: boolean;
        MULTIPLE: boolean;
        BOND: boolean;
        MIN?: number;
        MAX?: number;
        BONDTYPE: string;
        EMUNS: {
          NAME: string;
        }[];
      }[];
    }[];
  }[];
}
