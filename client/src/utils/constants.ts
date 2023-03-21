export const COLORS = {

    primaryBackgroundColor: "#14213D",
    accentBackgroundColor: "#0E1933",

    primaryTextColor: "white",
    primaryBackgroundItemColor: "#263657",

    primaryColor: "#FCA311",

    dangerColor: "#EF3636",
};

export const RUOLI = {
    ADMIN: "admin",
    MANAGER: "manager",
    ADDETTO_ALLA_CUCINA: "addetto alla cucina",
    CAMERIERE: "cameriere",
    NESSUNO: "nessuno"
};

export interface Result {
    success: boolean; 
    data: string 
}