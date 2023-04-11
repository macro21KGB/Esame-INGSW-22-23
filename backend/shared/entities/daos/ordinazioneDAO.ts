import { Ordinazione } from '../ordinazione';

interface OpzioniTemporali {
    dataInizio: DateString;
    dataFine: DateString;
}

type DateString = `${number}-${number}-${number}`;

interface IOrdinazioneDAO {
    getOrdinazioni(idRistorante: number, evase: boolean): Promise<Ordinazione[]>
    getOrdinazioniNonEvase(): Promise<Ordinazione[]>;
    getOrdinazioneConCodiceTavolo(codice_tavolo: number): Promise<Ordinazione[]>;
    getOrdinazione(id: number): Promise<Ordinazione>;

    evadiOrdinazione(idOrdinazione: number, idUtente: number): Promise<boolean>;

    getOrdinazioneEvaseDa(idUtente: number, opzioni: OpzioniTemporali): Promise<{ giorno: DateString, numero_ordinazioni: number }[]>;

    addOrdinazione(ordinazione: Ordinazione, idConto: number): Promise<boolean>;
    updateOrdinazione(ordinazione: Ordinazione): Promise<Ordinazione>;
    deleteOrdinazione(id: number): Promise<boolean>;

}
export type { IOrdinazioneDAO };