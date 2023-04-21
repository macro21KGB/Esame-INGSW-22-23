import { randomInt } from 'crypto';
import { describe, expect, it } from 'vitest';
import { UtenteDAO } from '../entities/daos/utenteDAO';
import { bool, object } from 'prop-types';

// initialize the utenteDAO
const utenteDAO = new UtenteDAO();


describe('Prova', () => {

    describe('funzione1()', () => {


        it("dovrebbe ritornare false", async () => {
            expect(false).toBe(false)
        });

        it("test", async () => {
            expect(false).toBeTypeOf('boolean');
        });

        it("dovrebbe ritornare false", async () => {
            expect(true).toBe(true);

        });


    });


    describe('funzione2()', () => {

        it("dovrebbe ritornare false", async () => {
            expect(false).toBe(false)
        });

        it("dovrebbe ritornare true", async () => {
            expect(true).toBe(true);

        });

        it("dovrebbe ritornare false", async () => {
            expect(true).toBe(false);

        });
    })
});
