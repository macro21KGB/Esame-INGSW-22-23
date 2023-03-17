import mysql, { Connection } from "mysql"

type ConnectionResult = Connection | null;

class ConnectionSingleton {

  private static instance: Connection | null = null;

  public static getInstance(): ConnectionResult {

    if (this.instance == null) {

      try {
        const connection = mysql.createConnection({
          host: 'localhost',
          user: 'dbuser',
          password: 'admin',
          database: 'test_db'
        });

        return connection;

      } catch {
        console.log("ERRORE: Connessione");
      }

    }
    return this.instance;

  }

}

export { ConnectionSingleton }
