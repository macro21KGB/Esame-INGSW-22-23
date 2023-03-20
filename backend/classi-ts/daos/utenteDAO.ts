import { Utente } from "../utente";

interface IUtenteDAO {
    getUtente(email: string, password: string): Promise<Utente>;
    addUtente(utente: Utente): Promise<Utente>;
    updateUtente(utente: Utente): Promise<Utente>;
    deleteUtente(utente: Utente): Promise<Utente>;
}



class UtenteDAO {
    getUtente(email: string, password: string): Promise<Utente> {
        throw new Error('Method not implemented.');
    }
    addUtente(utente: Utente): Promise<Utente> {
        throw new Error('Method not implemented.');
    }
    updateUtente(utente: Utente): Promise<Utente> {
        throw new Error('Method not implemented.');
    }
    deleteUtente(utente: Utente): Promise<Utente> {
        throw new Error('Method not implemented.');
    }
}

export { UtenteDAO };