import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
import { ConnectionSingleton } from "./connection";



dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8085;


app.get('/', (req: Request, res: Response) => {
  res.send('Express server');
})

app.get('/ristorante/:id', (req: Request, res: Response) => {

  res.send("Ristorante 1");

})

app.get('/ristoranti', (req: Request, res: Response) => {

  //eseguo query
  try {

    const connection = ConnectionSingleton.getInstance()
    let result = "";

    connection?.connect()

    connection?.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
      if (err) throw err;


      result = rows[0].solution
    })

    console.log(result)

    res.json({
      id: 1,
      nome: "Bella Portici",
      locazione: "Via roma,12",
      sitoWeb: "https://bella-portici.it"

    })

  } catch {
    console.log("ERRORE RISTORANTI")

  }

})


app.listen(port, () => {
  console.log('Server running on ' + port)
})
