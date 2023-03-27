import express, { Request, Response, NextFunction, Router } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import cors from 'cors';
import { Utente,RUOLI } from './shared/entities/utente'
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
    //console.log(err)

    if (err) return res.status(403).json({message:"Invalid token"});

    console.log("TOKEN OK");
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
  console.log(user);
  const payload: TokenPayload = {
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
  res.status(200).send({ message: 'Antani' });
});

router.get('/prova', (req: Request, res: Response) => {
  const json_str = JSON.stringify(new Utente("pippo","rossi","email","password",RUOLI.ADMIN));
  const u = JSON.parse(json_str) as Utente;
  console.log(u.cognome);
  UtenteDAO.getUtenti().then((utenti) => {
    console.log(utenti);
  } );
  
  res.status(200).json(json_str);
});

router.get('/secure', authenticateToken, (req: Request, res: Response) => {
  res.status(200).send({ message: 'Secure Hello World' });
});

router.get('/resturants', authenticateToken, async (req: Request, res: Response) => {
  res.status(200).json(JSON.stringify(await RistoranteDAO.getRistoranti()));
});

router.get('/resturant/:id', authenticateToken, async(req: Request, res: Response) => {
  const ristorante = await RistoranteDAO.getRistorante(+req.params.id);
  if(ristorante!=null)
    res.status(200).json(JSON.stringify(ristorante));
  else
    res.status(404).json({"message":"nessun ristorante con questo id"});
  
});

router.post('/resturant', authenticateToken, async(req: Request, res: Response) => {
  // TODO mettersi d'accordo su come passare i dati
  try{
    const ristorante = JSON.parse(req.body) as Ristorante;
    console.log(ristorante);
    /*

    if(await RistoranteDAO.addRistorante(ristorante))
      res.status(200).send({ message: 'Ristorante aggiunto' });
    else
      res.status(400).send({ message: 'Ristorante non aggiunto' });
      */
  }
  catch(e){
    res.status(400).send({ message: 'Bad request' });
  }
  
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
