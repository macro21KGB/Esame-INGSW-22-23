import express, { Request, Response, NextFunction, Router } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import cors from 'cors';
import { Utente,RUOLI } from '../client/src/entities/utente'
import { UtenteDAOPostgresDB } from './db_dao/utente';

const UtenteDAO = new UtenteDAOPostgresDB();

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
    console.log(err)

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
  res.status(200).send({ message: 'Server is up and running! rizz' });
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

router.get('/resturants', authenticateToken, (req: Request, res: Response) => {
  //TODO
  res.status(200).send({ message: 'Ristoranti' });
});

router.get('/resturant/:id', authenticateToken, (req: Request, res: Response) => {
  //TODO
  res.status(200).send({ message: 'Ristoranti' });
});

router.post('/resturant', authenticateToken, (req: Request, res: Response) => {
  //TODO
  res.status(200).send({ message: 'Ristoranti' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
