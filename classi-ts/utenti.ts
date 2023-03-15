import { Ristorante } from './ristorante';

// questa interfaccia serve per indicare che un utente può essere un supervisore
// nel nostro caso solo l'admin non può essere un supervisore
interface ICanBeSupervisor {
    supervisore: boolean;
}

abstract class Utente {
    nome: string;
    cognome: string;
    telefono: string;
    email: string;

    constructor(nome: string, cognome: string, telefono: string, email: string) {
        this.nome = nome;
        this.cognome = cognome;
        this.telefono = telefono;
        this.email = email;
    }
}

/**
 * Classe che rappresenta un amministratore di un ristorante
 * @class Admin
 * @extends Utente
 * @method setRistoranti - Imposta i ristoranti gestiti dall'amministratore
 * @method getRistoranti - Restituisce i ristoranti gestiti dall'amministratore
 * @method fromTuttiIDati - Crea un oggetto Admin a partire da tutti i dati
 * @method fromUtenteERistoranti - Crea un oggetto Admin a partire da un oggetto Utente e un array di ristoranti
 */
class Admin extends Utente {
    private _ristoranti: Ristorante[];

    setRistoranti(ristoranti: Ristorante[]) {
        this._ristoranti = ristoranti;
    }

    getRistoranti(): Ristorante[] {
        return this._ristoranti;
    }

    public static fromTuttiIDati(nome : string, cognome : string, telefono : string, email : string, ristoranti : Ristorante[]) : Admin {
        const admin = new Admin(nome, cognome, telefono, email);
        admin.setRistoranti(ristoranti);
        return admin;
    }


    public static fromUtenteERistoranti(utente: Utente, ristoranti: Ristorante[]): Admin {
        const admin = new Admin(utente.nome, utente.cognome, utente.telefono, utente.email);
        admin.setRistoranti(ristoranti);
        return admin;
    }
}




class Cameriere extends Utente implements ICanBeSupervisor {

    supervisore: boolean;
    constructor(nome: string, cognome: string, telefono: string, email: string, supervisore: boolean) {
        super(nome, cognome, telefono, email);
        this.supervisore = supervisore;
    }

}

class AddettoAllaCucina extends Utente implements ICanBeSupervisor {

    supervisore: boolean;
    
    constructor(nome: string, cognome: string, telefono: string, email: string, supervisore: boolean) {
        super(nome, cognome, telefono, email);
        this.supervisore = supervisore;
    }
}

export { Utente, Admin, Cameriere, AddettoAllaCucina, ICanBeSupervisor }