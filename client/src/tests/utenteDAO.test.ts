import axios from 'axios';
import { randomBytes, randomInt } from 'crypto';
import { describe, expect, it, test, vi } from 'vitest';
import { UtenteDAO } from '../entities/daos/utenteDAO';

// initialize the utenteDAO
const utenteDAO = new UtenteDAO();


describe('L utenteDAO dovrebbe permettere di registrare e loggare un utente', () => {

    describe('registraUtente()', () => {


        it("dovrebbe ritornare false se l'email o la password sono vuoti ('')", async () => {
            const email = '';
            const password = '';

            const response = await utenteDAO.registraUtente(email, password);

            expect(response).toBe(false)
        });

        it("dovrebbe ritornare true se l'utente è stato registrato con successo", async () => {
            const email = `test${randomInt(8000)}@test.com}`;
            const password = 'password';

            const result = await utenteDAO.registraUtente(email, password);

            expect(result).toBe(true);

        });

        it("dovrebbe ritornare false se l'utente non è stato registrato con successo, perchè gia registrato", async () => {
            const email = 'mario.rossi@gmail.com';
            const password = 'mario';

            const result = await utenteDAO.registraUtente(email, password);

            expect(result).toBe(false);

        });


    });
});
