

CREATE TYPE "Ruolo" AS ENUM (
  'ADDETTO_CUCINA',
  'CAMERIERE',
  'ADMIN'
);

CREATE TABLE "Utente" (
  "id_utente" SERIAL PRIMARY KEY,
  "nome" VARCHAR(50) ,
  "cognome" VARCHAR(50) ,
  "password" VARCHAR(200) NOT NULL,
  "telefono" VARCHAR(13) ,
  "email" VARCHAR(50) NOT NULL UNIQUE,
  "ruolo" "Ruolo" NOT NULL,
  "supervisore" bool DEFAULT false,
  "pw_changed" bool DEFAULT false
);

CREATE TABLE "UtenteRistorante" (
  "id_utente" int NOT NULL,
  "id_ristorante" int NOT NULL,
  "is_admin" bool DEFAULT false
);

CREATE TABLE "Ristorante" (
  "id_ristorante" SERIAL PRIMARY KEY,
  "nome" VARCHAR(50) NOT NULL,
  "indirizzo" VARCHAR(50),
  "telefono" VARCHAR(13),
  "sito_web" VARCHAR(50),
  "foto_path" VARCHAR(100)
);

CREATE TABLE "Categoria" (
  "id_categoria" SERIAL PRIMARY KEY,
  "id_ristorante" int NOT NULL,
  "nome" VARCHAR(50)
);

CREATE TABLE "Elemento" (
  "id_elemento" SERIAL PRIMARY KEY,
  "id_categoria" int NOT NULL,
  "nome" VARCHAR(50),
  "descrizione" VARCHAR(250),
  "prezzo" float CHECK ("prezzo" > 0),
  "ingredienti" VARCHAR(250),
  "ordine" integer DEFAULT 0 NOT NULL
);

CREATE TABLE "Conto" (
  "id_conto" SERIAL PRIMARY KEY,
  "id_ristorante" int NOT NULL,
  "codice_tavolo" VARCHAR(50) NOT NULL,
  "data" date DEFAULT CURRENT_DATE,
  "chiuso" bool DEFAULT false
);

CREATE TABLE "Ordinazione" (
  "id_ordinazione" SERIAL PRIMARY KEY,
  "id_conto" int NOT NULL,
  "timestamp" timestamp DEFAULT CURRENT_TIMESTAMP,
  "data" date DEFAULT CURRENT_DATE,
  "evaso_da" int,
  "evaso" bool DEFAULT false
);

CREATE TABLE "ElementoConQuantita" (
  "id_elemento" int NOT NULL,
  "id_ordinazione" int NOT NULL,
  "quantita" int CHECK ("quantita" > 0)
);

CREATE TABLE "Allergene" (
  "id" SERIAL PRIMARY KEY,
  "id_elemento" int NOT NULL,
  "nome" VARCHAR(50) NOT NULL
);

ALTER TABLE "UtenteRistorante" ADD FOREIGN KEY ("id_utente") REFERENCES "Utente" ("id_utente");

ALTER TABLE "UtenteRistorante" ADD FOREIGN KEY ("id_ristorante") REFERENCES "Ristorante" ("id_ristorante");

ALTER TABLE "Categoria" ADD FOREIGN KEY ("id_ristorante") REFERENCES "Ristorante" ("id_ristorante");

ALTER TABLE "Elemento" ADD FOREIGN KEY ("id_categoria") REFERENCES "Categoria" ("id_categoria");

ALTER TABLE "Ordinazione" ADD FOREIGN KEY ("id_conto") REFERENCES "Conto" ("id_conto");

ALTER TABLE "ElementoConQuantita" ADD FOREIGN KEY ("id_ordinazione") REFERENCES "Ordinazione" ("id_ordinazione") ON DELETE CASCADE;

ALTER TABLE "Conto" ADD FOREIGN KEY ("id_ristorante") REFERENCES "Ristorante" ("id_ristorante");

ALTER TABLE "ElementoConQuantita" ADD FOREIGN KEY ("id_elemento") REFERENCES "Elemento" ("id_elemento");

ALTER TABLE "Ordinazione" ADD FOREIGN KEY ("evaso_da") REFERENCES "Utente" ("id_utente");

ALTER TABLE "Allergene" ADD FOREIGN KEY ("id_elemento") REFERENCES "Elemento" ("id_elemento");

-- TRIGGER PER ASSEGNARE ORDINE CORRETTO ALL'ELEMENTO
CREATE OR REPLACE FUNCTION assegna_ordine() RETURNS TRIGGER AS $$
BEGIN                                  
    UPDATE "Elemento" SET ordine = COALESCE((SELECT MAX(ordine) FROM "Elemento" WHERE id_categoria = NEW.id_categoria), 0) + 1 WHERE id_elemento = NEW.id_elemento;              
    RETURN NEW;
END;                
$$ LANGUAGE plpgsql;
                                     
CREATE TRIGGER assegna_ordine_trigger
AFTER INSERT ON "Elemento"
FOR EACH ROW
EXECUTE FUNCTION assegna_ordine();

-- VIEW PER CONTARE IL NUMERO DI ORDINI PER CONTO
CREATE  OR REPLACE VIEW conto_numero_ordini AS SELECT c.id_conto, c.codice_tavolo, COUNT(o.id_ordinazione) AS numero_ordinazioni FROM "Conto" c JOIN "Ordinazione" o ON c.id_conto = o.id_conto GROUP BY c.codice_tavolo, c.id_conto;

INSERT INTO "Utente" ( nome, cognome, email,password,ruolo, telefono) VALUES ( 'Mario', 'Rossi', 'mario.rossi@gmail.com','$2a$12$2bqYtHD/BMJEx68.mYsQQeV27Uf5r.6kSIA69ADAr3DElSqtj21DS','ADMIN','3333333333');
INSERT INTO "Utente" ( nome, cognome, email,password,ruolo, telefono) VALUES ( 'Salvatore', 'Esposito', 'salvo.espo@gmail.com','$2a$12$nzu1NWK7El1q9AeHsa7PFuy16lE740S/KYeGIemtzqcSeiSFfKI8u','CAMERIERE','3333333333');
INSERT INTO "Utente" ( nome, cognome, email,password,ruolo,supervisore, telefono) VALUES ( 'Luigi', 'Verdi', 'luigi.verdi@gmail.com','$2a$12$yiZCgsjbcUuor2lbRk4fBeUjSAXHe4C/bvWExUJhBU8YUWFuw796m','ADDETTO_CUCINA',true,'3333333333');
INSERT INTO "Utente" ( nome, cognome, email,password,ruolo, telefono) VALUES ( 'Mario', 'Cameriere', 'mario.cameriere@gmail.com','$2a$12$2bqYtHD/BMJEx68.mYsQQeV27Uf5r.6kSIA69ADAr3DElSqtj21DS','ADDETTO_CUCINA','3333333333');
INSERT INTO "Utente" ( nome, cognome, email,password,ruolo, telefono) VALUES ( 'Peppe', 'Cameriere', 'peppe.cameriere@gmail.com','$2a$12$2bqYtHD/BMJEx68.mYsQQeV27Uf5r.6kSIA69ADAr3DElSqtj21DS','ADDETTO_CUCINA','3333333333');
INSERT INTO "Ristorante" ( nome, indirizzo, telefono, sito_web, foto_path) VALUES ( 'Ristorante 1', 'Via Roma 1', '3333333333', 'www.ristorante1.it', 'foto1.jpg');

INSERT INTO "UtenteRistorante" ( id_utente, id_ristorante, is_admin) VALUES ( 1, 1, true);
INSERT INTO "UtenteRistorante" ( id_utente, id_ristorante, is_admin) VALUES ( 2, 1, false);
INSERT INTO "UtenteRistorante" ( id_utente, id_ristorante, is_admin) VALUES ( 3, 1, false);
INSERT INTO "UtenteRistorante" ( id_utente, id_ristorante, is_admin) VALUES ( 4, 1, false);
INSERT INTO "UtenteRistorante" ( id_utente, id_ristorante, is_admin) VALUES ( 5, 1, false);

INSERT INTO "Categoria" ( id_ristorante, nome) VALUES ( 1, 'Primi');
INSERT INTO "Categoria" ( id_ristorante, nome) VALUES ( 1, 'Secondi');
INSERT INTO "Categoria" ( id_ristorante, nome) VALUES ( 1, 'Contorni');
INSERT INTO "Categoria" ( id_ristorante, nome) VALUES ( 1, 'Bevande');
INSERT INTO "Categoria" ( id_ristorante, nome) VALUES ( 1, 'Dolci');

INSERT INTO "Elemento" ( id_categoria, nome, descrizione, prezzo, ingredienti) VALUES ( 1, 'Pasta al pomodoro', 'descrizione pasta al pomodoro', 5.00, 'Pasta, pomodoro');
INSERT INTO "Elemento" ( id_categoria, nome, descrizione, prezzo, ingredienti) VALUES ( 1, 'Pasta al pesto', 'descrizione pasta al pesto', 6.00, 'Pasta, pesto');
INSERT INTO "Elemento" ( id_categoria, nome, descrizione, prezzo, ingredienti) VALUES ( 2, 'Carne rossa', 'descrizione carne rossa', 7.00, 'carne');
INSERT INTO "Elemento" ( id_categoria, nome, descrizione, prezzo, ingredienti) VALUES ( 2, 'Carne bianca', 'descrizione carne bianca', 10.00, 'carne');
INSERT INTO "Elemento" ( id_categoria, nome, descrizione, prezzo, ingredienti) VALUES ( 3, 'Patate', 'descrizione patate', 3.50, 'patate');
INSERT INTO "Elemento" ( id_categoria, nome, descrizione, prezzo, ingredienti) VALUES ( 3, 'Insalata verde', 'descrizione insalata condita con limone', 2.50, 'insalata, limone');
INSERT INTO "Elemento" ( id_categoria, nome, descrizione, prezzo, ingredienti) VALUES ( 4, 'Acqua', 'descrizione acqua', 1.00, 'acqua');
INSERT INTO "Elemento" ( id_categoria, nome, descrizione, prezzo, ingredienti) VALUES ( 4, 'Coca Cola', 'descrizione coca cola', 2.00, 'coca cola');
INSERT INTO "Elemento" ( id_categoria, nome, descrizione, prezzo, ingredienti) VALUES ( 5, 'Tiramisù', 'descrizione tiramisù', 4.00, 'caffe, panna, biscotti');
INSERT INTO "Elemento" ( id_categoria, nome, descrizione, prezzo, ingredienti) VALUES ( 5, 'Cheesecake', 'descrizione tiramisù', 6.00, 'biscotti, panna, berry');

INSERT INTO "Allergene" (id_elemento, nome) VALUES (2,'glutine');
INSERT INTO "Allergene" (id_elemento, nome) VALUES (2,'lattosio');
INSERT INTO "Allergene" (id_elemento, nome) VALUES (4,'frutta a guscio');


/*
SELECT * FROM (
SELECT "Utente".id_utente as id_utente, "Utente".email as email,
 "Utente".password as pw,"Utente".ruolo as ruolo, "UtenteRistorante".id_ristorante as id_ristorante
FROM ("Utente" inner join "UtenteRistorante" on "Utente".id_utente = "UtenteRistorante".id_utente)
)as t natural join "Ristorante";

SELECT * FROM (
SELECT "Utente".id_utente as id_utente, "Utente".email as email,
 "Utente".password as pw,"Utente".ruolo as ruolo, "UtenteRistorante".id_ristorante as id_ristorante
FROM ("Utente" natural join "UtenteRistorante")
) as t natural join "Ristorante" where id_utente = 0;
*/

/*
CREATE OR REPLACE FUNCTION assegna_ordine() RETURNS TRIGGER AS $$
BEGIN                                  
    UPDATE "Elemento" SET ordine = COALESCE((SELECT MAX(ordine) FROM "Elemento" WHERE id_categoria = NEW.id_categoria), 0) + 1 WHERE id_elemento = NEW.id_elemento;              
    RETURN NEW;
END;                
$$ LANGUAGE plpgsql;
                                     
CREATE TRIGGER assegna_ordine_trigger
AFTER INSERT ON "Elemento"
FOR EACH ROW
EXECUTE FUNCTION assegna_ordine();
*/