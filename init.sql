

CREATE TYPE "Ruolo" AS ENUM (
  'ADDETTO_CUCINA',
  'CAMERIERE',
  'ADMIN'
);

CREATE TABLE "Utente" (
  "id_utente" SERIAL PRIMARY KEY,
  "nome" VARCHAR(50),
  "cognome" VARCHAR(50),
  "password" VARCHAR(200) NOT NULL,
  "telefono" VARCHAR(13),
  "email" VARCHAR(50) NOT NULL UNIQUE,
  "ruolo" "Ruolo" NOT NULL,
  "supervisore" bool DEFAULT false
);

CREATE TABLE "UtenteRistorante" (
  "id_utente" int UNIQUE NOT NULL,
  "id_ristorante" int UNIQUE NOT NULL,
  "is_admin" bool
);

CREATE TABLE "Ristorante" (
  "id_ristorante" SERIAL PRIMARY KEY,
  "nome" VARCHAR(50),
  "indirizzo" VARCHAR(50),
  "telefono" VARCHAR(13),
  "sito_web" VARCHAR(50),
  "foto_path" VARCHAR(100)
);

CREATE TABLE "Categoria" (
  "id_categoria" SERIAL PRIMARY KEY,
  "id_ristorante" int UNIQUE NOT NULL,
  "nome" VARCHAR(50)
);

CREATE TABLE "Elemento" (
  "id_elemento" SERIAL PRIMARY KEY,
  "id_categoria" int UNIQUE NOT NULL,
  "nome" VARCHAR(50),
  "descrizione" VARCHAR(250),
  "prezzo" float,
  "ingredienti" VARCHAR(250)
);

CREATE TABLE "Conto" (
  "id_conto" SERIAL PRIMARY KEY,
  "id_ristorante" int UNIQUE NOT NULL,
  "codice_tavolo" VARCHAR(50) NOT NULL,
  "data" date
);

CREATE TABLE "Ordinazione" (
  "id_ordinazione" SERIAL PRIMARY KEY,
  "id_conto" int UNIQUE NOT NULL,
  "timestamp" timestamp,
  "data" date,
  "evaso_da" int UNIQUE NOT NULL,
  "evaso" bool
);

CREATE TABLE "ElementoConQuantita" (
  "id_elemento" int UNIQUE NOT NULL,
  "id_ordinazione" int UNIQUE NOT NULL,
  "quantita" int
);

CREATE TABLE "Allergene" (
  "id_elemento" int NOT NULL,
  "nome" VARCHAR(50) PRIMARY KEY NOT NULL
);

ALTER TABLE "UtenteRistorante" ADD FOREIGN KEY ("id_utente") REFERENCES "Utente" ("id_utente");

ALTER TABLE "UtenteRistorante" ADD FOREIGN KEY ("id_ristorante") REFERENCES "Ristorante" ("id_ristorante");

ALTER TABLE "Categoria" ADD FOREIGN KEY ("id_ristorante") REFERENCES "Ristorante" ("id_ristorante");

ALTER TABLE "Elemento" ADD FOREIGN KEY ("id_categoria") REFERENCES "Categoria" ("id_categoria");

ALTER TABLE "Ordinazione" ADD FOREIGN KEY ("id_conto") REFERENCES "Conto" ("id_conto");

ALTER TABLE "ElementoConQuantita" ADD FOREIGN KEY ("id_ordinazione") REFERENCES "Ordinazione" ("id_ordinazione");

ALTER TABLE "Conto" ADD FOREIGN KEY ("id_ristorante") REFERENCES "Ristorante" ("id_ristorante");

ALTER TABLE "ElementoConQuantita" ADD FOREIGN KEY ("id_elemento") REFERENCES "Elemento" ("id_elemento");

ALTER TABLE "Ordinazione" ADD FOREIGN KEY ("evaso_da") REFERENCES "Utente" ("id_utente");

ALTER TABLE "Allergene" ADD FOREIGN KEY ("id_elemento") REFERENCES "Elemento" ("id_elemento");


INSERT INTO "Utente" ( nome, cognome, email,password,ruolo) VALUES ( 'Mario', 'Rossi', 'mario.rossi@gmail.com','$2a$12$2bqYtHD/BMJEx68.mYsQQeV27Uf5r.6kSIA69ADAr3DElSqtj21DS','ADMIN');
INSERT INTO "Utente" ( nome, cognome, email,password,ruolo) VALUES ( 'Salvatore', 'Esposito', 'salvo.espo@gmail.com','$2a$12$nzu1NWK7El1q9AeHsa7PFuy16lE740S/KYeGIemtzqcSeiSFfKI8u','CAMERIERE');
INSERT INTO "Utente" ( nome, cognome, email,password,ruolo,supervisore) VALUES ( 'Luigi', 'Verdi', 'luigi.verdi@gmail.com','$2a$12$yiZCgsjbcUuor2lbRk4fBeUjSAXHe4C/bvWExUJhBU8YUWFuw796m','ADDETTO_CUCINA',true);

INSERT INTO "Ristorante" ( nome, indirizzo, telefono, sito_web, foto_path) VALUES ( 'Ristorante 1', 'Via Roma 1', '3333333333', 'www.ristorante1.it', 'foto1.jpg');