import express, { Request, Response, NextFunction, Router } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import cors from 'cors';
import { Utente,RUOLI,UtenteFactory, Admin, Cameriere, AddettoAllaCucina } from './shared/entities/utente'
import { UtenteDAOPostgresDB } from './db_dao/utente';
import { RistoranteDAOPostgresDB } from './db_dao/ristorante';
import { Ristorante } from './shared/entities/ristorante';

const UtenteDAO = new UtenteDAOPostgresDB();
const RistoranteDAO = new RistoranteDAOPostgresDB();

const app = express();
const router = Router();
const port = 3000;

const secret = 'ilMioSegretoSegretissimo';

interface TokenPayload {
  id : number,
  nome : string,
  cognome : string,
  email: string,
  ruolo : RUOLI
}

function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}


function authenticateToken(req : Request, res : Response, next : NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({message:"Token not provided"});
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) return res.status(403).json({message:"Invalid token"});
    console.log(decoded as TokenPayload);
    next()
  })
}


// Middleware
app.use(cors())
app.use('/api', router);
router.use(express.json());


router.post('/login', async (req: Request, res: Response) => {
  if (!req.body['username'] || !req.body['password'])
    return res.status(400).send({ message: 'Credentials not provided.' });

  const [username, password] = [req.body['username'] as string, req.body['password'] as string]
  
  const user = await UtenteDAO.accediUtente(username,password);
  if (user!=null) { 
    console.log("authorized");
  }
  else {
    console.log("unauthorized");
    return res.status(401).send({ message: 'Invalid credentials.' });
  }
  const id = await UtenteDAO.getIdUtente(username);
  if (id == null) return res.status(400).send({ message: 'Unexpected error' });
  console.log("utente id: "+id);
  const payload: TokenPayload = {
    id: id,
    nome: user.nome,
    cognome : user.cognome,
    email :user.email,
    ruolo :user.ruolo?user.ruolo:RUOLI.ADMIN
  }
  const response = { success: true, data: generateToken(payload) };

  res.status(200).json(response);
});


router.post('/register',async (req: Request, res: Response) => {
  if (!req.body['username'] || !req.body['password'])
    return res.status(400).send({ message: 'Wrong parameters' });

  const [username, password] = [req.body['username'] as string, req.body['password'] as string];

  // verifica che non esista utente
  const utenti = await UtenteDAO.getUtenti();
  if(utenti.find(u => u.email === username))
    return res.status(400).send({ success: false, data: "Utente già registrato" });

  // crea user nel db
  UtenteDAO.registraUtente(username,password);
  res.status(200).send({ success: true, data: "Registrazione avvenuta con successo" });
});

router.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Server is up and running!' });
});

router.get('/test', (req: Request, res: Response) => {
  // crea un utente cameriere usando la factory
  const cameriere = UtenteFactory.creaUtente(" ", " ", " ", " ", RUOLI.CAMERIERE,true);
  let user : Cameriere;
  if(cameriere.ruolo == RUOLI.CAMERIERE)
  {
    user = cameriere as Cameriere;
    // stampa il campa supervisore
    console.log("supervisor cameriere: "+user.supervisore);
  }

  // crea un utente addetto alla cucina 
  const addetto = UtenteFactory.creaUtente(" ", " ", " ", " ", RUOLI.ADDETTO_CUCINA,false);
  let user2 : AddettoAllaCucina;
  if(addetto.ruolo == RUOLI.ADDETTO_CUCINA)
  {
    user2 = addetto as AddettoAllaCucina;
    // stampa il campa supervisore
    console.log("supervisor addetto: "+user2.supervisore);
  }

  // crea un utente admin
  const admin = UtenteFactory.creaUtente(" ", " ", " ", " ", RUOLI.ADMIN);
  let user3 : Admin;
  if(admin.ruolo == RUOLI.ADMIN)
  {
    user3 = admin as Admin;
    // stampa il campo supervisore
    console.log("admin ristoranti: "+user3.getRistoranti().length);
  }
     
  res.status(200).send({ message: 'Test!' });
});

router.get('/resturants', authenticateToken, async (req: Request, res: Response) => {
  // ottieni email dell'utente dal token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({message:"Token not provided"});

  jwt.verify(token, secret, async(err: any, decoded: any) => {
    if (err) return res.status(403).json({message:"Invalid token"});
    const email = decoded.email;
    res.status(200).json(JSON.stringify(await UtenteDAO.getRistoranti(email)));
  })
});

router.get('/resturant/:id', authenticateToken, async(req: Request, res: Response) => {
  const ristorante = await RistoranteDAO.getRistorante(+req.params.id);
  if(ristorante!=null)
    res.status(200).json(JSON.stringify(ristorante));
  else
    res.status(404).json({"message":"nessun ristorante con questo id"});
  
});

router.post('/resturant', authenticateToken, async(req: Request, res: Response) => {
  if (!req.body['nome'] || !req.body['indirizzo'] || !req.body['telefono']){
    res.status(400).json({success:false, data: 'Bad request' });
    return;
  }
  const  sitoweb = req.body['sitoWeb'] || '';
  const ristorante = new Ristorante(0,req.body['nome'],req.body['indirizzo'],req.body['telefono'],sitoweb);
  // ottieni id utente dal token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({message:"Token not provided"});
  jwt.verify(token, secret, async(err: any, decoded: any) => {
    if (err) return res.status(403).json({message:"Invalid token"});
    const id_utente = decoded.id;
    try {
      if(await RistoranteDAO.addRistorante(ristorante,id_utente)) 
        res.status(200).send({success:true, data: 'Ristorante aggiunto' });
      else
        res.status(400).send({success:false, data: 'Ristorante non aggiunto' });
    }
    catch(err) {
      res.status(400).send({success:false, data: 'Ristorante già esistente' });
    }
  });
  
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
