import { randomInt } from 'crypto';
import { describe, expect, it } from 'vitest';
import { ElementoDAO } from '../entities/daos/elementoDAO';
import { Elemento } from '../entities/menu';
import { UtenteDAO } from '../entities/daos/utenteDAO';


const elementoDAO = new ElementoDAO();
const utenteDAO = new UtenteDAO(); // utente per effettuare il login e ottenere il token
export function salvaTokenInCookie(token: string, tempoDiScadenza: number): string {
    const dataDiScadenza = new Date();
    dataDiScadenza.setTime(dataDiScadenza.getTime() + tempoDiScadenza * 1000);
    document.cookie = `token=${token}; expires=${dataDiScadenza.toUTCString()}; path=/`;

    return token;
}

describe('Elemento DAO dovrebbe permettere di creare un nuovo elemento e scambiare elementi esistenti in una categoria', async () => {
    const email = 'mario.rossi@gmail.com';
    const password = 'mario';
    const token = (await utenteDAO.accediUtente(email, password)).data.token;

    describe('addElemento()', () => {
        it("dovrebbe ritornare true se l'elemento è stato registrato con successo", async () => {
            const elemento = new Elemento(`test${randomInt(8000)}`,
                "Descrizione",
                2,
                {
                    ingredienti: [],
                    allergeni: [],
                    ordine: 0
                }
            );
            const result = await elementoDAO.addElemento(elemento, 1, token);
            expect(result.success).toBe(true);
            expect(result.data).toBeTypeOf('string');
        });

        it("dovrebbe ritornare false se il nome dell'elemento è ('')", async () => {
            const elemento = new Elemento("",
                "Descrizione",
                2,
                {
                    ingredienti: [],
                    allergeni: [],
                    ordine: 0
                }
            );
            const result = await elementoDAO.addElemento(elemento, 1, token);
            expect(result.success).toBe(false);
            expect(result.data).toBeTypeOf('string');
        });

        it("dovrebbe ritornare false se il prezzo è negativo", async () => {
            const elemento = new Elemento("prova",
                "Descrizione",
                -1,
                {
                    ingredienti: [],
                    allergeni: [],
                    ordine: 0
                }
            );
            const result = await elementoDAO.addElemento(elemento, 1, token);
            expect(result.success).toBe(false);
            expect(result.data).toBeTypeOf('string');
        });

    });


    describe('scambiaElementi()', () => {

        it("Lo scambio di due elementi esistenti dovrebbe ritornare true", async () => {
            const result = await elementoDAO.scambiaElementi(1, 2, token);
            expect(result.success).toBe(true);
            expect(result.data).toBeTypeOf('string');
        });

        it("Lo scambio dello stesso elemento dovrebbe ritornare un messaggio di alert", async () => {
            const result = await elementoDAO.scambiaElementi(1, 1, token);
            expect(result.success).toBe(true);
            expect(result.data).toBeTypeOf('string');
            expect(result.data).toBe('Non ha senso scambiare lo stesso elemento');
        });

        it("Lo scambio elementi che non esistono non solleva errore e ritorna false", async () => {
            const result = await elementoDAO.scambiaElementi(-2, -1, token);
            expect(result.success).toBe(false);
            expect(result.data).toBeTypeOf('string');
        });

    })
});
