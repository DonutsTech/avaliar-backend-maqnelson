import { prisma } from "../prisma";
import { markWheelsService } from "../services/markWheels";
import { uuid } from "./uuid";

export const initMarkWheels = async () => {
  try {
    const existsMarkWheels = await markWheelsService.countMarkWheels();

    if (existsMarkWheels === 0) {
      const markWheelsData = [
        {
          NAME: "MICHELIN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "BKT",
          UUIDAPP: await uuid()
        },
        {
          NAME: "MITAS",
          UUIDAPP: await uuid()
        },
        {
          NAME: "TRELLEBORG",
          UUIDAPP: await uuid()
        },
        {
          NAME: "FIRESTONE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "GOODYEAR",
          UUIDAPP: await uuid()
        },
        {
          NAME: "TITAN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "ALLIANCE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "YOKOHAMA OFF HIGHWAY TIRES",
          UUIDAPP: await uuid()
        },
        {
          NAME: "GALAXY",
          UUIDAPP: await uuid()
        },
        {
          NAME: "CONTINENTAL",
          UUIDAPP: await uuid()
        },
        {
          NAME: "VREDESTEIN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "NOKIAN TYRES",
          UUIDAPP: await uuid()
        },
        {
          NAME: "KLEBER",
          UUIDAPP: await uuid()
        },
        {
          NAME: "PETLAS",
          UUIDAPP: await uuid()
        },
        {
          NAME: "OZKA",
          UUIDAPP: await uuid()
        },
        {
          NAME: "ASCENSO",
          UUIDAPP: await uuid()
        },
        {
          NAME: "CEAT",
          UUIDAPP: await uuid()
        },
        {
          NAME: "APOLLO",
          UUIDAPP: await uuid()
        },
        {
          NAME: "JK TYRE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "BIRLA TYRES",
          UUIDAPP: await uuid()
        },
        {
          NAME: "MRF",
          UUIDAPP: await uuid()
        },
        {
          NAME: "LINGLONG",
          UUIDAPP: await uuid()
        },
        {
          NAME: "DOUBLE COIN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "WESTLAKE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "GOODRIDE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "LONGMARCH",
          UUIDAPP: await uuid()
        },
        {
          NAME: "TRIANGLE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "SAILUN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "CHAOYANG",
          UUIDAPP: await uuid()
        },
        {
          NAME: "ARMOUR",
          UUIDAPP: await uuid()
        },
        {
          NAME: "MALHOTRA",
          UUIDAPP: await uuid()
        },
        {
          NAME: "SPEEDWAYS",
          UUIDAPP: await uuid()
        },
        {
          NAME: "RALCO",
          UUIDAPP: await uuid()
        },
        {
          NAME: "TVS EUROGRIP",
          UUIDAPP: await uuid()
        },
        {
          NAME: "HARVEST KING",
          UUIDAPP: await uuid()
        },
        {
          NAME: "CARLISLE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "CAMSO",
          UUIDAPP: await uuid()
        },
        {
          NAME: "PRIMEX",
          UUIDAPP: await uuid()
        },
        {
          NAME: "BOHNENKAMP",
          UUIDAPP: await uuid()
        },
        {
          NAME: "FORERUNNER",
          UUIDAPP: await uuid()
        },
        {
          NAME: "DEESTONE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "ROADX",
          UUIDAPP: await uuid()
        },
        {
          NAME: "OTANI",
          UUIDAPP: await uuid()
        },
        {
          NAME: "TAURUS",
          UUIDAPP: await uuid()
        },
        {
          NAME: "BARUM",
          UUIDAPP: await uuid()
        },
        {
          NAME: "MATADOR",
          UUIDAPP: await uuid()
        },
        {
          NAME: "ROSAVA",
          UUIDAPP: await uuid()
        },
        {
          NAME: "BELSHINA",
          UUIDAPP: await uuid()
        },
        {
          NAME: "VOLTYRE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "ALTURA",
          UUIDAPP: await uuid()
        },
        {
          NAME: "CULTOR",
          UUIDAPP: await uuid()
        },
        {
          NAME: "STARMAXX",
          UUIDAPP: await uuid()
        },
        {
          NAME: "LASSA",
          UUIDAPP: await uuid()
        },
        {
          NAME: "ANLAS",
          UUIDAPP: await uuid()
        },
        {
          NAME: "BANDENMARKT",
          UUIDAPP: await uuid()
        },
        {
          NAME: "RIKEN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "KORMORAN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "TIGAR",
          UUIDAPP: await uuid()
        },
        {
          NAME: "SEBRING",
          UUIDAPP: await uuid()
        },
        {
          NAME: "MARSHAL",
          UUIDAPP: await uuid()
        },
        {
          NAME: "KUMHO",
          UUIDAPP: await uuid()
        },
        {
          NAME: "HANKOOK",
          UUIDAPP: await uuid()
        },
        {
          NAME: "NEXEN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "TOYO",
          UUIDAPP: await uuid()
        },
        {
          NAME: "FALKEN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "GENERAL TIRE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "COOPER",
          UUIDAPP: await uuid()
        },
        {
          NAME: "MASTERCRAFT",
          UUIDAPP: await uuid()
        },
        {
          NAME: "MICKEY THOMPSON",
          UUIDAPP: await uuid()
        },
        {
          NAME: "INTERCO",
          UUIDAPP: await uuid()
        },
        {
          NAME: "FEDERAL",
          UUIDAPP: await uuid()
        },
        {
          NAME: "MAXXIS",
          UUIDAPP: await uuid()
        },
        {
          NAME: "CHENG SHIN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "KENDA",
          UUIDAPP: await uuid()
        },
        {
          NAME: "DELI TIRE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "SHANDONG TAISHAN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "TOPTRUST",
          UUIDAPP: await uuid()
        },
        {
          NAME: "EVERGREEN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "WINDPOWER",
          UUIDAPP: await uuid()
        },
        {
          NAME: "AEOLUS",
          UUIDAPP: await uuid()
        },
        {
          NAME: "TECHKING",
          UUIDAPP: await uuid()
        },
        {
          NAME: "DURATURN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "ADVANCE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "ROADSHINE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "HIFLY",
          UUIDAPP: await uuid()
        },
        {
          NAME: "FULLRUN",
          UUIDAPP: await uuid()
        },
        {
          NAME: "COMPASAL",
          UUIDAPP: await uuid()
        },
        {
          NAME: "PIRELLI",
          UUIDAPP: await uuid()
        },
        {
          NAME: "BRIDGESTONE",
          UUIDAPP: await uuid()
        },
        {
          NAME: "DUNLOP",
          UUIDAPP: await uuid()
        },
        {
          NAME: "BFGOODRICH",
          UUIDAPP: await uuid()
        },
        {
          NAME: "UNIROYAL",
          UUIDAPP: await uuid()
        },
        {
          NAME: "KELLY",
          UUIDAPP: await uuid()
        },
        {
          NAME: "ROADCRUZA",
          UUIDAPP: await uuid()
        },
        {
          NAME: "MILEKING",
          UUIDAPP: await uuid()
        },
        {
          NAME: "LEAO",
          UUIDAPP: await uuid()
        },
        {
          NAME: "ROVELO",
          UUIDAPP: await uuid()
        },
        {
          NAME: "ECOMEGA",
          UUIDAPP: await uuid()
        },
        {
          NAME: "AGATE",
          UUIDAPP: await uuid()
        }
      ]

      await prisma.markWheels.createMany({
        data: markWheelsData,
      });

      console.log("Marcas de rodas inicializadas com sucesso!");
    }
  } catch (error) {
    throw error;
  }
}
