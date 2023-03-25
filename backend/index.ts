import express, { Request, Response, NextFunction, Router } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import cors from 'cors';
import { Utente,RUOLI } from '../client/src/entities/utente'

const app = express();
const router = Router();
const port = 3000;

const secret = 'ilMioSegretoSegretissimo';

interface TokenPayload {
  id : string,
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


router.post('/login', (req: Request, res: Response) => {
  if (!req.body['username'] || !req.body['password'])
    return res.status(400).send({ message: 'Credentials not provided.' });

  const [username, password] = [req.body['username'] as string, req.body['password'] as string]
  console.log("Credentials: "+username + " "+ password);
  // dummy user
  if (username === 'pippo' && password === '123') { 
    console.log("authorized");
  }
  else {
    console.log("unauthorized");
    return res.status(401).send({ message: 'Invalid credentials.' });
  }
  const payload: TokenPayload = {
    id: "6969",
    nome: "pippo",
    cognome : "rossi",
    email :"pippo.rossi@gmail.com",
    ruolo :RUOLI.ADMIN
  }
  const response = { success: true, data: generateToken(payload) };

  res.status(200).json(response);
});


router.post('/register', (req: Request, res: Response) => {
  if (!req.body['username'] || !req.body['password'])
    return res.status(400).send({ message: 'Wrong parameters' });

  const [username, password] = [req.body['username'] as string, req.body['password'] as string];

  // verifica che non esista utente
  if(username =="pippo")
    return res.status(400).send({ success: false, data: "Utente già registrato" });

  // crea user nel db

  res.status(200).send({ success: true, data: "Registrazione avvenuta con successo" });
});

router.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Server is up and running! test' });
});

router.get('/prova', (req: Request, res: Response) => {
  const json_str = JSON.stringify(new Utente("pippo","rossi","email","password",RUOLI.ADMIN));
  const u = JSON.parse(json_str) as Utente;
  console.log(u.cognome);
  res.status(200).json(json_str);
});

router.get('/secure', authenticateToken, (req: Request, res: Response) => {
  res.status(200).send({ message: 'Secure Hello World' });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
