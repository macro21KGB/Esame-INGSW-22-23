# Esame di INGEGNERIA DEL SOFTWARE a.s. 22-23 UNIVERSITÀ DEGLI STUDI DI NAPOLI FEDERICO II 
#### Documentazione completa
[See full documentation](https://github.com/macro21KGB/Esame-INGSW-22-23/blob/0a892bc2036aad68a2edb86f2f5b047fca5ade6e/DOC_ING_SW_2022_23.pdf)
#### Autori
- Mario De Luca N86/3911
- Alessandro Bonomo N86/3852
#### Sistema commissionato: Ratatouille23
Ratatouille23 è un sistema informativo sviluppato per supportare la gestione e l’operatività
di attività di ristorazione. L’obiettivo del team di sviluppo è quello di creare un’applicazione
performante e affidabile, dotata di funzionalità intuitive e rapide da utilizzare, al fine di garantire
una piacevole esperienza d’uso agli utenti. Tra le principali funzionalità del sistema vi sono la
possibilità per gli amministratori di creare utenze per i propri dipendenti, la personalizzazione del
menù dell’attività di ristorazione, la registrazione delle ordinazioni e la visualizzazione in tempo
reale degli ordini da parte degli addetti alla cucina, la generazione del conto per ogni tavolo
e la visualizzazione di statistiche dettagliate sulla produttività del personale addetto alla cucina.
Ratatouille23 mira quindi a semplificare e ottimizzare le attività di gestione e operatività all’interno
delle attività di ristorazione, fornendo agli utenti un’esperienza d’uso fluida e intuitiva.
## 3 Tier Architecture
L'app è strutturata su 3 livelli:

- `Tier 1:Client` Il frontend, o livello di presentazione, ha lo scopo di creare l’interfaccia utente dell’applicazione, che
l’utente finale vedrà e con cui interagirà. Nel caso specifico, il frontend è stato realizzato utilizzando `React`. React consente di creare interfacce utente reattive e performanti, migliorando l’esperienza
dell’utente. Inoltre, il frontend dialoga con le API del backend, e con `API esterne per l’autocompletamento del testo`. Le query alle API sono gestite tramite `React query`, una libreria molto utilizzata
allo stato dell’arte che integra meccanismi automatici di caching e semplificazione delle query asincrone
ai server. Il frontend non si occupa di elaborare i dati o di effettuare operazioni complesse, ma si limita
a presentare i dati e a interagire con gli altri livelli dell’applicazione, senza dover preoccuparsi degli
aspetti tecnici sottostanti. Inoltre, viene utilizzato `Google Analytics SDK` per inviare i dati raccolti dagli utenti al servizio `Firebase`.

- `Tier 2: Server` Il livello di backend, o livello di elaborazione, è responsabile dell’elaborazione dei dati e delle logiche di
controllo dell’applicazione. Nel caso specifico, è stata realizzata una `REST API in express Node.js`.
Una REST API (API di tipo Representational State Transfer) è un’interfaccia che permette alle
applicazioni di comunicare tra loro, scambiando dati in formato JSON o XML attraverso richieste
HTTP. Essa è basata sul concetto di risorse, ovvero oggetti o dati che possono essere richiesti, creati,
aggiornati o cancellati. Per garantire la sicurezza delle richieste e delle risposte, è stato utilizzato
`JSON Web Token (JWT)`. Un JWT è un token di sicurezza che viene utilizzato per autenticare
e autorizzare gli utenti in modo sicuro, senza dover trasmettere le credenziali dell’utente ad ogni
richiesta. In definitiva, il livello di backend è responsabile dell’elaborazione dei dati e delle logiche di
controllo dell’applicazione, garantendo al contempo la sicurezza e il controllo dell’accesso ai dati e alle
funzionalità dell’applicazione stessa.

- `Tier 3: Database` Il terzo tier dell’architettura a tre livelli è il database PostgreSQL che ha il ruolo di Information source.
Il database `PostgreSQL` di tipo relazionale conserva i dati e garantisce la loro integrità grazie ai
constraint e trigger definiti nello schema. Il database viene inizializzato con delle istanze predefinite
dallo script init.sql.

## Dockerized Tech Stack
Per facilitare il deployment e garantire la modularità e robustezza dell’applicazione è stato deciso di
utilizzare Docker per dividere l’ l’applicazione in più container con responsabilità separate. Docker
permette di isolare i servizi in container, in modo da gestirli in maniera indipendente e controllata.

![archi](https://github.com/macro21KGB/Esame-INGSW-22-23/assets/75626033/55c63e19-2623-4515-bada-8cdbfca93e5b)
#### I containers
- `node-db` Database postgres
- `node-server` Backend API express + Framework documentazione APIs SwaggerUI 
- `node-client` Frontend React app
- `storybook` Framework documentazione dei component del frontend

## Hosted on DigitalOcean
Digital Ocean è stato scelto come provider di hosting per rendere il software accessibile su Internet.
Digital Ocean fornisce un’infrastruttura di hosting affidabile e facile da usare. In particolare, fornisce
un indirizzo IP statico, garantendo che il sito web sia costantemente accessibile tramite lo stesso
indirizzo IP. Per quanto riguarda la configurazione, Docker ha reso la distribuzione dell’applicazione
estremamente semplice e portatile, consentendoci con l’esecuzione del docker-compose di costruire ed
eseguire i container automaticamente. Infine, è stato configurato il nome di dominio su Aruba:
ratatouille.bonomo.cloud che punta all’IP statico del server Digital Ocean.

![digi](https://github.com/macro21KGB/Esame-INGSW-22-23/assets/75626033/62c071f1-0fb7-46ac-ba6d-bfe6b8a9febd)

#### Servizi che può raggiungere l'utente

- `Sito web Ratatouille`: http://ratatouille.bonomo.cloud/
- `Documentazione API` : http://ratatouille.bonomo.cloud:3000/doc
- `Documentazione frontend`: http://ratatouille.bonomo.cloud:6006/

## Test driven developement con Vitest
Durante lo sviluppo sono stati configurati dei black box Unit test con `vitest`. 
