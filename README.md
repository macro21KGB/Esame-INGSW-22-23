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

La presentazione deve essere tecnica.
Lunghezza del PowerPoint con la presentazione di almeno 15 minuti
## Statechart
https://stately.ai/registry/editor/843a1992-59c6-4dcd-92fd-18a4aaee61c9?machineId=4e0fd1da-012c-4a06-9e70-1255ec257767

## Riferimenti utili
https://nayak.io/posts/docker-compose-postgres-and-connection-refused/

https://stackoverflow.com/questions/54941329/share-interfaces-between-api-and-frontend

https://www.geeksforgeeks.org/factory-method-for-designing-pattern/

