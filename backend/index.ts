import { Conto } from './shared/entities/conto';
import express, { Request, Response, NextFunction, Router } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import cors from 'cors';
import { Utente, RUOLI, UtenteFactory, Admin, Cameriere, AddettoAllaCucina } from './shared/entities/utente'
import { UtenteDAOPostgresDB } from './db_dao/utente';
import { RistoranteDAOPostgresDB } from './db_dao/ristorante';
import { ElementoDAOPostgresDB, CategoriaDAOPostgresDB, AllergeneDAOPostgresDB } from './db_dao/menu';
import { Ristorante } from './shared/entities/ristorante';
import { Categoria, Elemento, Allergene, ElementoConQuantita } from './shared/entities/menu';
import { Result, checkRequestBody, getAuthTokenFromRequest } from './utils';
import { OrdinazioneDAOPostgresDB } from './db_dao/ordinazione';
import { Ordinazione } from './shared/entities/ordinazione';
import { ContoDAOPostgresDB } from './db_dao/conto';
import { swaggerSetup } from './helper/documentation';

const UtenteDAO = new UtenteDAOPostgresDB();
const RistoranteDAO = new RistoranteDAOPostgresDB();
const ElementoDAO = new ElementoDAOPostgresDB();
const CategoriaDAO = new CategoriaDAOPostgresDB();
const AllergeneDAO = new AllergeneDAOPostgresDB();
const ContoDAO = new ContoDAOPostgresDB();
const OrdinazioneDAO = new OrdinazioneDAOPostgresDB();

const app = express();
const router = Router();
const port = 3000;

import swagger from "swagger-ui-express";

const secret = 'ilMioSegretoSegretissimo';

interface TokenPayload {
  id: number,
  nome: string,
  cognome: string,
  email: string,
  ruolo: RUOLI
  supervisore: boolean
}

function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}


function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({ message: "Token not provided" });
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    //console.log(decoded as TokenPayload);
    next()
  })
}

function requiresAdminRole(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({ success: false, data: "Token not provided" });
  jwt.verify(token, secret, async (err: any, decoded: any) => {
    if (err) return res.status(403).json({ success: false, data: "Invalid token" });
    const ruolo = decoded.ruolo;
    if (ruolo != RUOLI.ADMIN) {
      res.status(403).json({ success: false, data: "Non sei autorizzato ad accedere a questa risorsa" });
      return;
    }
    next();
  });
}

function requiresSupervisor(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({ success: false, data: "Token not provided" });
  jwt.verify(token, secret, async (err: any, decoded: any) => {
    if (err) return res.status(403).json({ success: false, data: "Invalid token" });
    const supervisore = decoded.supervisore;
    const ruolo = decoded.ruolo;
    if (!supervisore && ruolo != RUOLI.ADMIN) {
      res.status(403).json({ success: false, data: "Non sei autorizzato ad accedere a questa risorsa" });
      return;
    }
    next();
  }
  );
}

export function blockAccessToOtherResturantsEmployees(req: Request, res: Response, next: NextFunction) {
  if (req.params.email == null)
    return res.status(400).json({ success: false, data: "Employee email not provided" });
  const emailEmployee = req.params.email;

  // spacchetta il token e controlla che tu sia admin
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({ success: false, data: "Token not provided" });
  jwt.verify(token, secret, async (err: any, decoded: any) => {
    if (err) return res.status(403).json({ success: false, data: "Invalid token" });

    // ottieni l'admin dell'utente che si vuole modificare e controlla che tu sia admin
    const admin = await UtenteDAO.getAdmin(emailEmployee);
    if (admin == null) {
      res.status(401).json({ success: false, data: 'Non sei autorizzato a modificare questo utente' });
      return;
    }
    else if (admin.email != decoded.email) {
      res.status(401).json({ success: false, data: 'Non sei autorizzato a modificare questo utente' });
      return;
    }
    next();
  });
}

const swaggerUiOptions = {
  swaggerOptions: {
    bearerAuth: {
      name: 'Authorization',
      schema: {
        type: 'bearer',
        in: 'header'
      },
      value: 'Bearer <token>'
    }
  }
}

// Middleware
app.use(cors())
app.use('/api', router);
app.use('/doc', swagger.serve);
app.use('/doc', swagger.setup(swaggerSetup, swaggerUiOptions));
router.use(express.json());

// UTENTI
router.post('/login', async (req: Request, res: Response) => {
  if (!checkRequestBody(req, ['username', 'password']))
    return res.status(400).send({ message: 'Credentials not provided.' });

  const [username, password] = [req.body['username'] as string, req.body['password'] as string]

  const user = await UtenteDAO.accediUtente(username, password);
  if (user != null) {
    console.log("authorized");
  }
  else {
    console.log("unauthorized");
    return res.status(401).send({ message: 'Invalid credentials.' });
  }
  const id = await UtenteDAO.getIdUtente(username);
  if (id == null) return res.status(400).send({ message: 'Unexpected error' });
  let supervisore = false;
  if (user instanceof Cameriere || user instanceof AddettoAllaCucina) {
    supervisore = (user as Cameriere).supervisore || (user as AddettoAllaCucina).supervisore;
  }
  //console.log("utente id: " + id);
  const payload: TokenPayload = {
    id: id,
    nome: user.nome,
    cognome: user.cognome,
    email: user.email,
    ruolo: user.ruolo ? user.ruolo : RUOLI.ADMIN,
    supervisore: supervisore
  }
  const response = {
    success: true, data:
    {
      token: generateToken(payload),
      ruolo: user.ruolo ? user.ruolo : RUOLI.ADMIN,
      supervisore: supervisore
    }
  };

  res.status(200).json(response);
});


router.post('/register', async (req: Request, res: Response) => {
  if (!req.body['username'] || !req.body['password'])
    return res.status(400).send({ message: 'Wrong parameters' });

  const [username, password] = [req.body['username'] as string, req.body['password'] as string];

  // verifica che non esista utente
  const utenti = await UtenteDAO.getUtenti();
  if (utenti.find(u => u.email === username))
    return res.status(400).send({ success: false, data: "Utente già registrato" });

  // crea user nel db
  UtenteDAO.registraUtente(username, password);
  res.status(200).send({ success: true, data: "Registrazione avvenuta con successo" });
});


router.post('/utenza/:id_ristorante', authenticateToken, requiresAdminRole, async (req: Request, res: Response) => {
  if (!req.body['nome'] || !req.body['cognome'] || !req.body['email'] || !req.body['password']
    || !req.body['ruolo'] || !req.body['telefono'] || !req.body['supervisore'])
    return res.status(400).send({ message: 'Wrong parameters' });

  const [nome, cognome, email, password, ruolo, telefono] = [req.body['nome'] as string,
  req.body['cognome'] as string, req.body['email'] as string, req.body['password'] as string,
  req.body['ruolo'] as RUOLI, req.body['telefono'] as string];

  const supervisore = req.body['supervisore'] as boolean;

  const id_ristorante = req.params.id_ristorante;
  if (id_ristorante == null)
    return res.status(400).send({ message: 'id ristorante missing' });
  // verifica che non esista utente
  const utenti = await UtenteDAO.getUtenti();
  if (utenti.find(u => u.email === email))
    return res.status(400).send({ success: false, data: "Utente già registrato" });

  // crea utente con factory
  const utente = UtenteFactory.creaUtente(nome, cognome, telefono, email, ruolo, supervisore);
  // crea user nel db
  if (await UtenteDAO.registraUtenza(utente, password, +id_ristorante))
    return res.status(200).send({ success: true, data: "Registrazione avvenuta con successo" });
  else
    return res.status(400).send({ success: false, data: "Errore durante la registrazione" });

});

router.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Server is up and running!' });
});

router.get('/super', requiresSupervisor, (req: Request, res: Response) => {
  res.status(200).send({ message: 'You are super!' });
});

router.get('/autodestroy', (req: Request, res: Response) => {
  throw new Error('Boom!');
});


// --------------------------------------------------------------------------------------
// RISTORANTI
// --------------------------------------------------------------------------------------
router.get('/resturants', authenticateToken, async (req: Request, res: Response) => {
  // ottieni email dell'utente dal token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({ message: "Token not provided" });

  jwt.verify(token, secret, async (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    const email = decoded.email;
    res.status(200).json(JSON.stringify(await UtenteDAO.getRistoranti(email)));
  })
});

router.get('/resturant/:id', authenticateToken, async (req: Request, res: Response) => {
  const ristorante = await RistoranteDAO.getRistorante(+req.params.id);
  if (ristorante != null)
    res.status(200).json(JSON.stringify(ristorante));
  else
    res.status(404).json({ "message": "nessun ristorante con questo id" });

});

// get id resturant by id utente using the JWT token
router.get('/resturant', authenticateToken, async (req: Request, res: Response) => {
  // ottieni email dell'utente dal token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({ message: "Token not provided" });

  jwt.verify(token, secret, async (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    const email = decoded.email;
    const ristorante = await UtenteDAO.getRistorante(email);
    if (ristorante != null)
      res.status(200).json(ristorante);
    else
      res.status(404).json({ "message": "nessun ristorante con questo id" });
  })
})

router.post('/resturant', authenticateToken, async (req: Request, res: Response) => {
  if (!req.body['nome'] || !req.body['indirizzo'] || !req.body['telefono']) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  const sitoweb = req.body['sitoWeb'] || '';
  const ristorante = new Ristorante(0, req.body['nome'], req.body['indirizzo'], req.body['telefono'], sitoweb);
  // ottieni id utente dal token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({ message: "Token not provided" });
  jwt.verify(token, secret, async (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    const id_utente = decoded.id;
    try {
      if (await RistoranteDAO.addRistorante(ristorante, id_utente))
        res.status(200).send({ success: true, data: 'Ristorante aggiunto' });
      else
        res.status(400).send({ success: false, data: 'Ristorante non aggiunto' });
    }
    catch (err) {
      res.status(400).send({ success: false, data: 'Ristorante già esistente' });
    }
  });
});

// --------------------------------------------------------------------------------------
// UTENTI
// --------------------------------------------------------------------------------------
router.put('/utente/:email', authenticateToken, requiresAdminRole, blockAccessToOtherResturantsEmployees, async (req: Request, res: Response) => {
  if (!req.body['nome'] || !req.body['cognome'] || !req.body['telefono']) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  const emailKey = req.params.email;

  const utente = await UtenteDAO.getUtente(emailKey);
  if (utente == null) {
    res.status(400).json({ success: false, data: 'Utente non trovato' });
    return;
  }
  utente.nome = req.body['nome'];
  utente.cognome = req.body['cognome'];
  utente.telefono = req.body['telefono'];
  const supervisore = req.body['supervisore'] as boolean || false;
  try {
    if (await UtenteDAO.updateUtente(utente, utente.email, supervisore))
      res.status(200).send({ success: true, data: 'Utente aggiornato' });
    else
      res.status(400).send({ success: false, data: 'Utente non aggiornato' });
  }
  catch (err) {
    res.status(400).send({ success: false, data: 'Utente non aggiornato' });
  }

});


router.delete('/utente/:email', authenticateToken, requiresAdminRole, blockAccessToOtherResturantsEmployees, async (req: Request, res: Response) => {
  const emailKey = req.params.email;
  // ottieni email da token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({ message: "Token not provided" });
  jwt.verify(token, secret, async (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    const email = decoded.email;
    if (email == emailKey) {
      res.status(400).json({ success: false, data: 'Non puoi cancellare te stesso' });
      return;
    }
  });

  const utente = await UtenteDAO.getUtente(emailKey);
  if (utente == null) {
    res.status(400).json({ success: false, data: 'Utente non trovato' });
    return;
  }
  try {
    if (await UtenteDAO.deleteUtente(utente.email))
      res.status(200).send({ success: true, data: 'Utente cancellato' });
    else
      res.status(400).send({ success: false, data: 'Utente non cancellato' });
  }
  catch (err) {
    res.status(400).send({ success: false, data: 'Utente non cancellato' });
  }

});

router.get('/utente/:idUtente', authenticateToken, async (req: Request, res: Response) => {
  const idUtente = +req.params.idUtente;

  if (idUtente == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }

  res.status(200).json((await UtenteDAO.getUtenteById(idUtente)));
})

// get utenti 
router.get('/utenti/:id_ristorante', authenticateToken, requiresAdminRole, async (req: Request, res: Response) => {
  const id_ristorante = +req.params.id_ristorante;
  res.status(200).json(JSON.stringify(await UtenteDAO.getUtentiRistorante(id_ristorante)));
});

router.get('/pw-changed', authenticateToken, async (req: Request, res: Response) => {
  // ottieni email dal token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({ message: "Token not provided" });
  jwt.verify(token, secret, async (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    const email = decoded.email;
    res.status(200).json(JSON.stringify(await UtenteDAO.isPasswordChanged(email)));
  }
  )
});

router.post('/pw-change', authenticateToken, async (req: Request, res: Response) => {
  const newPassword = req.body['password'];
  if (newPassword == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  // ottieni email utente dal token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({ message: "Token not provided" });
  jwt.verify(token, secret, async (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    const email = decoded.email;
    try {
      if (await UtenteDAO.updatePassword(email, newPassword))
        res.status(200).send({ success: true, data: 'Password cambiata' });
      else
        res.status(400).send({ success: false, data: 'Password non cambiata' });
    }
    catch (err) {
      res.status(400).send({ success: false, data: 'Password non cambiata' });
    }
  }
  );
});

// --------------------------------------------------------------------------------------
// CATEGORIE MENU
// --------------------------------------------------------------------------------------
router.get('/categorie/:id_ristorante', authenticateToken, async (req: Request, res: Response) => {
  const id_ristorante = req.params.id_ristorante;
  if (id_ristorante == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  res.status(200).json(JSON.stringify(await CategoriaDAO.getCategorie(+id_ristorante)));
});


router.post('/categoria', authenticateToken, requiresSupervisor, async (req: Request, res: Response) => {
  if (!req.body['nome'] || !req.body['id_ristorante']) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  const categoria = new Categoria(req.body['nome'], [], 0, +req.body['id_ristorante']);
  try {
    if (await CategoriaDAO.addCategoria(categoria))
      res.status(200).send({ success: true, data: 'Categoria aggiunta' });
    else
      res.status(400).send({ success: false, data: 'Categoria non aggiunta' });
  }
  catch (err) {
    res.status(400).send({ success: false, data: 'Categoria non aggiunta' });
  }
});


router.delete('/categoria/:id_categoria', authenticateToken, requiresSupervisor, async (req: Request, res: Response) => {
  const id_categoria = req.params.id_categoria;
  if (id_categoria == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  try {
    if (await CategoriaDAO.deleteCategoria(+id_categoria))
      res.status(200).send({ success: true, data: 'Categoria cancellata' });
    else
      res.status(400).send({ success: false, data: 'Categoria non vuota' });
  }
  catch (err) {
    res.status(400).send({ success: false, data: 'Categoria non cancellata' });
  }
});

router.put('/categoria/:id_categoria', authenticateToken, requiresSupervisor, async (req: Request, res: Response) => {
  const id_categoria = req.params.id_categoria;
  if (id_categoria == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  const nome = req.body['nome'];
  if (nome == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  try {
    if (await CategoriaDAO.updateCategoria(+id_categoria, nome))
      res.status(200).send({ success: true, data: 'Categoria aggiornata' });
    else
      res.status(400).send({ success: false, data: 'Categoria non aggiornata' });
  }
  catch (err) {
    res.status(400).send({ success: false, data: 'Categoria non aggiornata' });
  }
});


// --------------------------------------------------------------------------------------
// ORDINAZIONI
// --------------------------------------------------------------------------------------

router.post('/ordina/:idRistorante', authenticateToken, async (req: Request, res: Response) => {
  // ottieni token
  const token = getAuthTokenFromRequest(req);
  if (token == undefined) {
    res.status(401).json({ success: false, data: 'Unauthorized' });
    return;
  }
  const infoUtente = jwt.verify(token, secret) as TokenPayload;
  if (infoUtente == undefined) {
    res.status(401).json({ success: false, data: 'Unauthorized' });
    return;
  }
  if(infoUtente.ruolo != RUOLI.CAMERIERE) {
    res.status(403).json({ success: false, data: 'Forbidden' });
    return;
  }
  const idRistorante = req.params.idRistorante;
  const codiceTavolo = req.body['codiceTavolo'];
  const elementi = req.body['elementi'] as ElementoConQuantita[];
  if (idRistorante == null || codiceTavolo == null || elementi == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }

  const contoTavolo = await ContoDAO.getContoByCodiceTavolo(codiceTavolo, +idRistorante);

  // non esiste ancora un conto per questo tavolo al momento
  if (contoTavolo == null) {

    const nuovoConto = new Conto(undefined, codiceTavolo, undefined)

    const idContoCreato = await ContoDAO.creaConto(nuovoConto, +idRistorante);

    if (idContoCreato == null) {
      res.status(400).json({ success: false, data: 'Errore creazione conto' });
      return;
    }

    const nuovaOrdinazione = new Ordinazione(codiceTavolo, undefined, undefined, false, elementi);

    const isOrdineCreato = await OrdinazioneDAO.addOrdinazione(nuovaOrdinazione, idContoCreato);

    if (isOrdineCreato) {
      res.status(200).json({ success: true, data: 'Ordine creato' });
    }
    else {
      res.status(400).json({ success: false, data: 'Errore creazione ordine' });
    }

  }
  else {

    const nuovaOrdinazione = new Ordinazione(codiceTavolo, undefined, undefined, false, elementi);

    const isOrdineCreato = await OrdinazioneDAO.addOrdinazione(nuovaOrdinazione, contoTavolo.id_conto);

    if (isOrdineCreato) {
      res.status(200).json({ success: true, data: 'Ordine creato' });
    }
    else {
      res.status(400).json({ success: false, data: 'Errore creazione ordine' });
    }

  }

});

// prende gli ordini di un utente in una determinata data
router.post('/ordinazioni/evase/', authenticateToken, async (req: Request, res: Response) => {
  type DateString = `${number}-${number}-${number}`;

  if (!req.body['dataInizio'] || !req.body['dataFine'] || !req.body['emailUtente']) {
    res.status(400).send("Bad request");
    return;
  }

  const dataInizio = req.body['dataInizio'] as DateString;
  const dataFine = req.body['dataFine'] as DateString;
  const emailUtente = req.body['emailUtente'] as string;

  const ordinazioni = await OrdinazioneDAO.getOrdinazioneEvaseDa(emailUtente, { dataInizio, dataFine });

  if (ordinazioni != null) {
    res.status(200).json(ordinazioni);
  }
  else {
    res.status(400).send("Errore");
  }
});


router.get('/ordinazioni/:isEvase', authenticateToken, async (req: Request, res: Response<Result<string | Ordinazione[]>>) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == undefined) {
    res.status(401).json({ success: false, data: 'Unauthorized' });
    return;
  }

  const isEvase = req.params.isEvase == 'true' ? true : false;
  if (isEvase == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }

  jwt.verify(token, secret, async (err, user) => {
    if (err) {
      res.status(403).json({ success: false, data: 'Forbidden' });
      return;
    }

    // get ristorante da email utente
    if (user == null) {
      res.status(403).json({ success: false, data: 'Forbidden' });
      return;
    }

    //@ts-ignore
    const email = user['email'];

    if (email == null) {
      res.status(403).json({ success: false, data: 'Forbidden' });
      return;
    }

    const ristorante = await UtenteDAO.getRistorante(email);

    const ordinazioniPrese = await OrdinazioneDAO.getOrdinazioni(ristorante.id, isEvase);

    res.status(200).json({
      success: true,
      data: ordinazioniPrese
    });
  });
})

router.delete('/ordinazione/:idOrdinazione', authenticateToken, async (req: Request, res: Response) => {
  const token = getAuthTokenFromRequest(req);
  if (token == undefined) {
    res.status(401).json({ success: false, data: 'Unauthorized' });
    return;
  }
  const infoUtente = jwt.verify(token, secret) as TokenPayload;
  if (infoUtente == undefined) {
    res.status(401).json({ success: false, data: 'Unauthorized' });
    return;
  }
  if(infoUtente.ruolo != RUOLI.CAMERIERE && infoUtente.ruolo != RUOLI.ADDETTO_CUCINA) {
    res.status(403).json({ success: false, data: 'Forbidden' });
    return;
  }
  const idOrdinazione: number = +req.params.idOrdinazione;
  if (idOrdinazione == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }

  jwt.verify(token, secret, async (err, user) => {
    if (err) {
      res.status(403).json({ success: false, data: 'Forbidden' });
      return;
    }

    if (user === undefined) {
      res.status(403).json({ success: false, data: 'Forbidden' });
      return;
    }

    await OrdinazioneDAO.deleteOrdinazione(idOrdinazione);
    res.status(200).json({ success: true, data: 'Ordinazione cancellata' });
    
  });
});

// evadi ordinazione
router.put('/ordinazione/:idOrdinazione', authenticateToken, async (req: Request, res: Response) => {
  const token = getAuthTokenFromRequest(req);
  if (token == undefined) {
    res.status(401).json({ success: false, data: 'Unauthorized' });
    return;
  }
  const infoUtente = jwt.verify(token, secret) as TokenPayload;
  if (infoUtente == undefined) {
    res.status(401).json({ success: false, data: 'Unauthorized' });
    return;
  }
  if(infoUtente.ruolo != RUOLI.ADDETTO_CUCINA) {
    res.status(403).json({ success: false, data: 'Forbidden' });
    return;
  }
  const idOrdinazione: number = +req.params.idOrdinazione;
  if (idOrdinazione == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }

  jwt.verify(token, secret, async (err, user) => {
    if (err) {
      res.status(403).json({ success: false, data: 'Forbidden' });
      return;
    }

    if (user === undefined) {
      res.status(403).json({ success: false, data: 'Forbidden' });
      return;
    }

    user = user as Utente;

    const isOrdineAggiornato = await OrdinazioneDAO.evadiOrdinazione(idOrdinazione, +user["id"]);

    if (isOrdineAggiornato) {
      res.status(200).json({ success: true, data: 'Ordine aggiornato' });
    }
    else {
      res.status(400).json({ success: false, data: 'Errore aggiornamento ordine' });
    }

  });

});

// --------------------------------------------------------------------------------------
// ELEMENTI MENU
// --------------------------------------------------------------------------------------
router.get('/elementi/:id_categoria', authenticateToken, async (req: Request, res: Response) => {
  const id_categoria = req.params.id_categoria;
  if (id_categoria == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  res.status(200).json(await ElementoDAO.getElementi(+id_categoria));
});

router.get('/elemento/:id_elemento', authenticateToken, async (req: Request, res: Response) => {
  const id_elemento = req.params.id_elemento;
  if (id_elemento == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  const elemento = await ElementoDAO.getElemento(+id_elemento);
  if (elemento == null)
    res.status(400).json({ success: false, data: 'Elemento non trovato' });
  res.status(200).json(JSON.stringify(elemento));
});

router.put('/scambia-elementi/:id_elemento1/:id_elemento2', authenticateToken, requiresSupervisor, async (req: Request, res: Response) => {
  const id_elemento1 = req.params.id_elemento1;
  const id_elemento2 = req.params.id_elemento2;
  if (id_elemento1 == null || id_elemento2 == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  try {
    if (id_elemento1 == id_elemento2) {
      res.status(200).send({ success: true, data: 'Non ha senso scambiare lo stesso elemento' });
      return;
    }
    if (+id_elemento1 < 0 || +id_elemento2 < 0) {
      res.status(200).send({ success: false, data: 'Errore: id negativi' });
      return;
    }
    if (await ElementoDAO.scambiaOrdineElementi(+id_elemento1, +id_elemento2))
      res.status(200).send({ success: true, data: 'Elementi scambiati' });
    else
      res.status(400).send({ success: false, data: 'Elementi non scambiati' });
  }
  catch (err) {
    res.status(400).send({ success: false, data: 'Elementi non scambiati' });
  }
});

router.delete('/elemento/:id_elemento', authenticateToken, requiresSupervisor, async (req: Request, res: Response) => {
  const id_elemento = req.params.id_elemento;
  if (id_elemento == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  try {
    if (await ElementoDAO.deleteElemento(+id_elemento))
      res.status(200).send({ success: true, data: 'Elemento cancellato' });
    else
      res.status(400).send({ success: false, data: 'Elemento non cancellato' });
  }
  catch (err) {
    res.status(400).send({ success: false, data: 'Elemento non cancellato' });
  }
});


router.put('/elemento/:id_elemento', authenticateToken, requiresSupervisor, async (req: Request, res: Response) => {
  const id_elemento = req.params.id_elemento;
  if (id_elemento == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  const nome = req.body['nome'];
  const prezzo = req.body['prezzo'];
  const descrizione = req.body['descrizione'];
  const ingredienti = req.body['ingredienti'];
  const allergeni = req.body['allergeni'];
  if (nome == null || prezzo == null || descrizione == null || ingredienti == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  const elemento = new Elemento(nome, descrizione, prezzo, {
    ingredienti: ingredienti.split(','),
    allergeni: allergeni.split(','),
    ordine: 0,
  });
  try {
    if (await ElementoDAO.updateElemento(+id_elemento, elemento))
      res.status(200).send({ success: true, data: 'Elemento aggiornato' });
    else
      res.status(400).send({ success: false, data: 'Elemento non aggiornato' });
  }
  catch (err) {
    //console.log(err);
    res.status(400).send({ success: false, data: 'Elemento non aggiornato' });
  }
});


router.post('/elemento', authenticateToken, requiresSupervisor, async (req: Request, res: Response) => {
  if (!req.body['nome'] || !req.body['prezzo'] || !req.body['descrizione'] || !req.body['id_categoria']) {
    res.status(400).send({ success: false, data: 'Bad request' });
    return;
  }
  const ingredienti = req.body['ingredienti'] || "";
  const array = req.body['allergeni'].split(",") || [];
  let allergeni: Allergene[] = [];
  for (let i = 0; i < array.length; i++)
    allergeni.push(new Allergene(array[i], 0));

  const elemento = new Elemento(req.body['nome'], req.body['descrizione'], req.body['prezzo'], {
    ingredienti: ingredienti.split(',') || [],
    allergeni: allergeni,
    ordine: 0,
  });
  try {
    if (await ElementoDAO.addElemento(elemento, +req.body['id_categoria']))
      res.status(200).send({ success: true, data: 'Elemento aggiunto' });
    else
      res.status(400).send({ success: false, data: 'Elemento non aggiunto' });
  }
  catch (err) {
    //console.log(err);
    res.status(400).send({ success: false, data: 'Elemento non aggiunto' });
  }
});
// --------------------------------------------------------------------------------------
// CONTI
// --------------------------------------------------------------------------------------

router.get('/conti', authenticateToken, requiresSupervisor, async (req: Request, res: Response) => {
  const token = getAuthTokenFromRequest(req);
  if (token == undefined) {
    res.status(401).json({ success: false, data: 'Unauthorized' });
    return;
  }

  const infoUtente = jwt.verify(token, secret) as TokenPayload;
  if (infoUtente == undefined) {
    res.status(401).json({ success: false, data: 'Unauthorized' });
    return;
  }


  const ristorante = await UtenteDAO.getRistorante(infoUtente['email'])

  const contiRistorante = await ContoDAO.getConti(ristorante.id);

  //console.log(contiRistorante[0].getImportoTotale());
  res.json(contiRistorante);
});

router.put('/conto/:id_conto', authenticateToken, requiresSupervisor, async (req: Request, res: Response) => {
  const id_conto = +req.params.id_conto;
  if (id_conto == null) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }

  try {
    if (await ContoDAO.chiudiConto(+id_conto))
      res.status(200).send({ success: true, data: 'Stato conto aggiornato' });
    else
      res.status(400).send({ success: false, data: 'Stato conto non aggiornato' });
  }
  catch (err) {
    res.status(400).send({ success: false, data: 'Stato conto non aggiornato' });
  }
});

// --------------------------------------------------------------------------------------
// ALLERGENI
// --------------------------------------------------------------------------------------
router.post('/allergene', authenticateToken, requiresSupervisor, async (req: Request, res: Response) => {
  if (!req.body['nome'] || !req.body['id_elemento']) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  try {
    if (await AllergeneDAO.addAllergene(new Allergene(req.body['nome'], +req.body['id_elemento'])))
      res.status(200).send({ success: true, data: 'Allergene aggiunto' });
    else
      res.status(400).send({ success: false, data: 'Allergene non aggiunto' });
  }
  catch (err) {
    res.status(400).send({ success: false, data: 'Allergene non aggiunto' });
  }
});

router.get('/allergeni/:id_elemento', authenticateToken, async (req: Request, res: Response) => {
  if (!req.params.id_elemento) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  const allergeni = await AllergeneDAO.getAllergeni(+req.params.id_elemento);
  res.status(200).json(JSON.stringify(allergeni));
});

router.delete('/allergene/:id_allergene', authenticateToken, requiresSupervisor, async (req: Request, res: Response) => {
  if (!req.params.id_allergene) {
    res.status(400).json({ success: false, data: 'Bad request' });
    return;
  }
  try {
    if (await AllergeneDAO.deleteAllergene(+req.params.id_allergene))
      res.status(200).send({ success: true, data: 'Allergene cancellato' });
    else
      res.status(400).send({ success: false, data: 'Allergene non cancellato' });
  }
  catch (err) {
    res.status(400).send({ success: false, data: 'Allergene non cancellato' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
