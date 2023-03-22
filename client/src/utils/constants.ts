const COLORS = {

    primaryBackgroundColor: "#14213D",
    accentBackgroundColor: "#0E1933",

    primaryTextColor: "white",
    primaryBackgroundItemColor: "#263657",

    primaryColor: "#FCA311",

    dangerColor: "#EF3636",
};

const RUOLI = {
    ADMIN: "admin",
    MANAGER: "manager",
    ADDETTO_ALLA_CUCINA: "addetto alla cucina",
    CAMERIERE: "cameriere",
    NESSUNO: "nessuno"
};

const ALLERGENI = {
    GLUTINE: "glutine",
    LATTOSIO: "lattosio",
    UOVO: "uovo",
    PESCE: "pesce",
    FRUTTA_A_GUSCIO: "frutta a guscio",
};

const API_URL = "http://localhost:3001/api";

export interface Result {
    success: boolean; 
    data: string 
}

export {
    COLORS,
    RUOLI,
    API_URL,
};