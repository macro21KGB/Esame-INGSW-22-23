Progetto iniziato 19 nov 2022, consegnato il 4 luglio 2023. 7 mesi di duro lavoro.
Presentato il 5 ottobre 2023 dopo che il 20 settembre non c'era cutugno.

## Segnaposti 
![WhatsApp Image 2023-10-05 at 16 20 34](https://github.com/macro21KGB/Esame-INGSW-22-23/assets/75626033/f6fbf5ab-e092-4bdd-ba7c-f0050608c255)

## Rip ratatouille

![WhatsApp Image 2023-10-09 at 22 08 41](https://github.com/macro21KGB/Esame-INGSW-22-23/assets/75626033/31e6e6f9-8e7f-447e-91e5-1e537bb39756)

- Mettere le proprie Revisioni nello schema

Strutturato in quattro parti
- Analisi dei requisiti
- Definizione dell'architettura
- Implementazione
- Codice
- Testing

17 macro aspetti da realizzare (2-3 per gruppo probabilemente??)

Tecnologie da usare: Mobile o Web

Possibili Scelte:
- Javascript/Typescript
- Java
- Flutter
- Kotlin
- C#

Database Da usare:
- Postregres
- MySql

Da hostare su:
- Digital Ocean
- AWS
- Azure
- GCloud

Strumenti CASE: Utilizzo di Strumenti per disegnare diagrammi
## Pattern fondamentali per lo sviluppo del progetto

![bible](https://user-images.githubusercontent.com/75626033/236901221-a7c82fbc-161c-458f-8259-6e508d374bbd.jpg)

## DAO Vs ORM
Il pattern Object Relational Mapping permette di scambiare oggetti con il database senza vedere l'SQL statements, ogni modifica degli oggetti viene automaticamente aggiornata nel db, il retrive delle entities viene eseguito mediante metodi get(), insert(). È necessario creare dei models che serviranno per definire il modello degli oggetti nel database. Gli oggetti definiti come models vengono poi tradotti in entità nel database postgres, mysql, oracle. 
Vantaggi
- non occorre usare sql

- codice più pulito visto che non ci sono statements sql

- compatibile con più database grazie al mapping dei models

- maggiore affidabilità delle query perché sono interne alla libreria dell'ORM

- Si può evitare di scrivere un DAO per ogni classe con tutti i metodi e invece utilizzare direttamente i metodi dell'ORM (su questo punto bisogna fare attenzione perché è sempre meglio avere un layer di astrazione come il DAO per la gestione di oggetti nel database). 

Svantaggi
- alcuni database meno conosciuti potrebbero non essere compatibili ai models

- non si ha il controllo completo che si ha con gli statements SQL

*riassumendo, con iDAO si deve fare una classe per entità con tutti i relativi metodi, si usano gli sql statements, se si vuole cambiare database occorrere riscrivere tutti i DAO per il nuovo database*
## Presentazione Finale
### Allow unsafe origin per QR scan
Articolo guida per chrome:

https://medium.com/@Carmichaelize/enabling-the-microphone-camera-in-chrome-for-local-unsecure-origins-9c90c3149339

- digitare su chrome: 

> chrome://flags/#unsafely-treat-insecure-origin-as-secure

- aggiungere nelle origin:

> http://ratatouille.bonomo.cloud/

ora se ci si logga con un cameriere ad esempio *salvatore* è possibile fare il qr scan senza problemi di permission alla camera del browser.
### Power point
La presentazione deve essere tecnica.
Lunghezza del PowerPoint con la presentazione di almeno 15 minuti
## Statechart
https://stately.ai/registry/editor/843a1992-59c6-4dcd-92fd-18a4aaee61c9?machineId=4e0fd1da-012c-4a06-9e70-1255ec257767

## Riferimenti utili
https://nayak.io/posts/docker-compose-postgres-and-connection-refused/

https://stackoverflow.com/questions/54941329/share-interfaces-between-api-and-frontend

https://www.geeksforgeeks.org/factory-method-for-designing-pattern/

